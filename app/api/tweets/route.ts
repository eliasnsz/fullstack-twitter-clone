import { NextResponse } from 'next/server'

import { createTweetSchema } from '@/types/validations/tweet'
import { UnauthorizedError } from '@/errors'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const page = Number(new URL(request.url).searchParams.get('page'))
  const limit = Number(new URL(request.url).searchParams.get('limit'))
  const username = new URL(request.url).searchParams.get('username')
  const onlyReplies = !!Number(
    new URL(request.url).searchParams.get('onlyReplies'),
  )

  const tweets_count = await prisma.tweet.count({
    where: {
      parentId: { not: 'null' },
      user: { username: username || undefined },
    },
  })

  const tweets = await prisma.tweet.findMany({
    where: {
      parentId: onlyReplies ? { not: null } : null,
      user: { username: username || undefined },
    },
    include: { user: true, _count: true },
    orderBy: { created_at: 'desc' },
    take: limit || undefined,
    skip: page && limit ? page * limit : undefined,
  })

  const lastPage = Math.ceil(tweets_count / limit) ?? undefined

  return NextResponse.json({
    page,
    perPage: limit || tweets_count,
    total_results: tweets_count,
    total_pages: lastPage,
    data: tweets,
  })
}

export async function POST(request: Request) {
  try {
    const { text, hashtags, mentions, userId, parentId, rootId } =
      createTweetSchema.parse(await request.json())

    const userExists = !!(await prisma.user.findUnique({
      where: { id: userId },
    }))

    if (!userExists) {
      return NextResponse.json(
        new UnauthorizedError({ message: 'Você deve estar autenticado.' }),
        { status: 401 },
      )
    }

    const createTweet = () =>
      prisma.tweet.create({
        data: {
          text,
          hashtags,
          mentions,
          userId,
          parentId,
          rootId,
        },
        include: {
          user: true,
        },
      })

    const incrementUserTweetCount = () =>
      prisma.user.update({
        where: { id: userId },
        data: { tweets_count: { increment: 1 } },
      })

    const [tweet] = await Promise.all([
      createTweet(),
      incrementUserTweetCount(),
    ])

    return NextResponse.json(tweet, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
