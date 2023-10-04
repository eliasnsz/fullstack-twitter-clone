import NextAuth from 'next-auth'
import { User } from './user'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: { image: string } & Pick<User, 'name' | 'email' | 'id' | 'username'>
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    username: string | null
  }
}
