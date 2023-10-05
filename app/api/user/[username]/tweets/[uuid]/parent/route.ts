import { BaseError, NotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    uuid: string
    username: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const { uuid, username } = params

  const userExists = !!(await prisma.user.findUnique({ where: { username } }))

  if (!userExists) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Usuário não encontrado',
      }),
      { status: 404 },
    )
  }

  const currentTweet = await prisma.tweet.findUnique({
    include: { parent: true },
    where: { id: uuid },
  })

  if (!currentTweet) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Tweet não encontrado',
      }),
    )
  }

  if (!currentTweet.parentId) {
    return NextResponse.json(
      new BaseError({
        message: 'Este já é o conteúdo raiz',
        statusCode: 400,
      }),
      { status: 400 },
    )
  }

  const parent = await prisma.tweet.findUnique({
    where: { id: currentTweet.parentId },
    include: { user: true, _count: true },
  })

  return NextResponse.json(parent)
}
