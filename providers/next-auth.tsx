'use client'
import { ComponentProps } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

type Props = ComponentProps<'div'>

export function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
