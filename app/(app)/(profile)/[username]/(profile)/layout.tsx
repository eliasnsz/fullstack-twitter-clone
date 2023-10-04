import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

import { getUser } from '@/actions/get-user'
import { Profile } from '@/components/profile'
import { ProfileTabSelector } from '@/components/profile-tab-selector'
import { ArrowBack } from '@/components/arrow-back'

interface RootProps {
  children: ReactNode
  params: { username: string }
}

export default async function ProfileLayout({ children, params }: RootProps) {
  const { username } = params

  const user = await getUser({ username })

  return (
    <div className="overflow-y-scroll max-h-screen remove-scrollbar">
      {/* Navbar */}
      <nav className="border-b border-b-border p-2 flex items-center gap-6">
        <ArrowBack />
        <h4 className="text-xl mt-0.5 font-extrabold text-foreground">
          Perfil
        </h4>
      </nav>
      {/* Profile */}
      <Profile user={user} username={username} />
      {user && (
        <>
          <ProfileTabSelector username={username} />
          <div className="py-2">{children}</div>
        </>
      )}
    </div>
  )
}
