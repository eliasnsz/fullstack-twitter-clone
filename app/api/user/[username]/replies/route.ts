import { NotFoundError } from '@/errors'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    username: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const { username } = params

  const userExists = !!(await prisma.user.findUnique({ where: { username } }))

  if (!userExists) {
    return NextResponse.json(
      new NotFoundError({
        message: 'Usuário não encontrado',
      }),
      { status: 404 },
    )
  }

  const tweets = await prisma.tweet.findMany({
    where: { parentId: { not: null }, user: { username } },
  })

  return NextResponse.json(tweets)
}
