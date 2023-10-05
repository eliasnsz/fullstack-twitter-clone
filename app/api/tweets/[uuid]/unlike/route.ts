import { NotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: { uuid: string }
}

export async function POST(request: Request, { params }: Params) {
  const { uuid: tweetId } = params
  const { userId } = await request.json()

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Usuário não encontrado',
      }),
      { status: 404 },
    )
  }

  const tweet = await prisma.tweet.findUnique({ where: { id: tweetId } })

  if (!tweet) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Tweet não encontrado',
      }),
      { status: 404 },
    )
  }

  const like = await prisma.like.findFirst({ where: { tweetId, userId } })

  await prisma.like.delete({
    where: { id: like?.id },
  })

  return NextResponse.json({}, { status: 201 })
}
