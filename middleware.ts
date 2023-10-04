import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = await getToken({ req: request })

  // Não permitir que o usuário navegue estando logado, mas sem nome de usuário.
  if (user && !user.username) {
    return NextResponse.rewrite(new URL('/auth/register', request.url))
  }

  // Não permitir que o usuário acesse a página para alterar nome de usuário caso já possua.
  if (request.nextUrl.pathname.startsWith('/auth/register')) {
    if (!user || user.username) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
