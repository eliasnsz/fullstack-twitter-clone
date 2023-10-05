import { NotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: { uuid: string; userId: string }
}

export async function GET(request: Request, { params }: Params) {
  const { uuid: tweetId, userId } = params

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Usuário não encontrado',
      }),
      { status: 404 },
    )
  }

  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId },
    include: { _count: true },
  })

  if (!tweet) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Tweet não encontrado',
      }),
      { status: 404 },
    )
  }

  const isLiked = !!(await prisma.like.findFirst({
    where: { AND: [{ tweetId }, { userId }] },
  }))

  return NextResponse.json(
    {
      likes: tweet._count.likes,
      isLiked,
    },
    { status: 201 },
  )
}
