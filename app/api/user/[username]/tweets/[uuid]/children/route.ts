import { NotFoundError } from '@/errors'
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

  const tweet = await prisma.tweet.findMany({
    where: { parentId: uuid },
    include: {
      children: { include: { user: true } },
      user: true,
      _count: true,
    },
    orderBy: { children: { _count: 'desc' } },
  })

  if (!tweet) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Tweet não encontrado',
      }),
    )
  }

  return NextResponse.json(tweet)
}
