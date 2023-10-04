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

  const tweet = await prisma.tweet.findUnique({
    include: { parent: true, _count: true },
    where: { id: uuid, user: { username } },
  })

  if (!tweet) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Tweet não encontrado',
      }),
    )
  }

  if (!tweet.parentId) {
    return NextResponse.json(
      new BaseError({
        message: 'Este já é o conteúdo raiz',
        statusCode: 400,
      }),
      { status: 400 },
    )
  }

  return NextResponse.json(tweet.parent)
}
