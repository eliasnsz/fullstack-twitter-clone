import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { createUserSchema } from '@/types/validations/user'
import { env } from '@/types/validations/env'
import { prisma } from '@/lib/prisma'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      const databaseUser = await prisma.user.findUnique({
        where: { email: token.email as string },
      })

      if (!databaseUser) {
        throw new Error('User not found')
      }

      token.sub = databaseUser.id
      token.username = databaseUser.username
      token.picture = databaseUser.profile_image_url

      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.sub as string
      session.user.username = token.username || null

      return session
    },
    signIn: async ({ user }) => {
      const { email, image, name } = createUserSchema.parse(user)

      const existentUser = await prisma.user.findFirst({
        where: { email },
      })

      if (!existentUser) {
        await prisma.user.create({
          data: {
            email,
            name,
            profile_image_url: image,
          },
        })
      }

      return true
    },
  },
  secret: env.NEXTAUTH_SECRET,
}
