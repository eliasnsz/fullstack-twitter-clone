import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/errors'
import { updateUserSchema } from '@/types/validations/user'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/auth'

interface GetParams {
  params: {
    uuid: string
  }
}

interface PutParams {
  params: {
    uuid: string
  }
}

export async function GET(request: Request, { params }: GetParams) {
  const { uuid } = params

  const user = await prisma.user.findUnique({
    where: { id: uuid },
    include: { tweets: { select: { id: true } } },
  })

  if (!user) {
    return NextResponse.json(
      new NotFoundError({ message: 'Usuário não encontrado.' }),
      { status: 404 },
    )
  }

  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: PutParams) {
  const { uuid } = params

  const user = await prisma.user.findUnique({
    where: { id: uuid },
  })

  if (!user) {
    return NextResponse.json(
      new NotFoundError({ message: 'Usuário não encontrado.' }),
      { status: 404 },
    )
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      new UnauthorizedError({ message: 'Você deve estar autenticado.' }),
      { status: 401 },
    )
  }

  if (session.user.id !== user.id) {
    return NextResponse.json(
      new ForbiddenError({
        message: 'Você não tem permissão para realizar essa ação.',
      }),
      { status: 403 },
    )
  }

  const userInfo = updateUserSchema.parse(await request.json())

  await prisma.user.update({ where: { id: user.id }, data: userInfo })

  return NextResponse.json({ status: 204 })
}
