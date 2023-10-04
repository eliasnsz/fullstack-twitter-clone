import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import logoSvg from '@/public/logo.svg'

import { authOptions } from '@/auth'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { UsernameForm } from '@/components/username-form'
import Image from 'next/image'

export default async function Register() {
  const session = await getServerSession(authOptions)

  if (session?.user.username) {
    redirect('/')
  }

  return (
    <div className="fixed inset-1/2 grid place-items-center w-full h-full -translate-x-1/2 -translate-y-1/2">
      <div className="absolute w-full h-full backdrop-blur-md" />
      <Card className="w-[600px] z-10 px-12 space-y-6">
        <CardHeader>
          {/* eslint-disable-next-line */}
          <Image
            src={logoSvg}
            alt=""
            className="m-auto h-12 w-12 dark:invert"
          />
          <CardTitle className="text-3xl text-foreground font-bold">
            Como devemos chamar você?
          </CardTitle>
          <CardDescription>
            Seu nome de usuário é exclusivo. Você pode alterá-lo novamente mais
            tarde.
          </CardDescription>
        </CardHeader>

        <UsernameForm />
      </Card>
    </div>
  )
}
