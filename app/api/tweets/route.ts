import { NextResponse } from 'next/server'

import { createTweetSchema } from '@/types/validations/tweet'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const page = Number(new URL(request.url).searchParams.get('page'))
  const limit = Number(new URL(request.url).searchParams.get('limit'))
  const tweets_count = await prisma.tweet.count()

  const tweets = await prisma.tweet.findMany({
    include: { user: true },
    orderBy: { created_at: 'desc' },
    take: limit,
    skip: page * limit,
  })

  const lastPage = Math.ceil(tweets_count / limit) - 1

  return NextResponse.json({
    page,
    perPage: limit,
    total_results: tweets_count,
    total_pages: lastPage,
    data: tweets,
  })
}

export async function POST(request: Request) {
  try {
    const { text, hashtags, mentions } = createTweetSchema.parse(
      await request.json(),
    )

    const $TEMP_USER_ID = '25f71911-0b58-4ffa-afa5-901ca77bc6a3'

    const tweet = await prisma.tweet.create({
      data: {
        text,
        hashtags,
        mentions,
        userId: $TEMP_USER_ID,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(tweet)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
