import { NextResponse } from 'next/server'

import { ForbiddenError, NotFoundError, ValidationError } from '@/errors'
import { prisma } from '@/lib/prisma'

interface Params {
  params: {
    userId: string
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { userId } = params
  const { username }: { username: string } = await request.json()

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return NextResponse.json(
      new NotFoundError({ message: 'Usuário não encontrado.' }),
      { status: 404 },
    )
  }

  if (userId !== user.id) {
    return NextResponse.json(
      new ForbiddenError({
        message: 'Você não tem permissão para realizar essa ação.',
      }),
      { status: 403 },
    )
  }

  const existsUserWithTheSameUsername = await prisma.user.findUnique({
    where: { username },
  })

  if (existsUserWithTheSameUsername) {
    return NextResponse.json(
      new ValidationError({ message: 'Já existe um usuário com esse nome.' }),
      { status: 400 },
    )
  }

  await prisma.user.update({ where: { id: user.id }, data: { username } })

  return NextResponse.json({ status: 204 })
}
