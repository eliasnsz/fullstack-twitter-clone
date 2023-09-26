import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import twitterLogo from '@/public/logo.svg'
import { Bell, HomeIcon, MoreHorizontal, SearchIcon, User2 } from 'lucide-react'

const navigation = [
  {
    label: 'Home',
    href: '/home',
    Icon: HomeIcon,
  },
  {
    label: 'Explorar',
    href: '/explore',
    Icon: SearchIcon,
  },
  {
    label: 'Notificações',
    href: '/notifications',
    Icon: Bell,
  },
  {
    label: 'Perfil',
    href: '/profile',
    Icon: User2,
  },
]

export function Navigation() {
  return (
    <aside className="border-r border-r-border h-full flex flex-col gap-6">
      <Image
        className="p-2 rounded-full aspect-square"
        src={twitterLogo}
        width={64}
        height={64}
        alt="logo"
      />
      <nav className="flex flex-1 justify-between flex-col">
        <ul className="flex flex-col gap-4">
          {navigation.map(({ Icon, label, href }, index) => {
            return (
              <Link href={href} key={index}>
                <li className="flex w-fit text-lg py-2 px-4 hover:bg-muted rounded-full transition-colors text-foreground items-center gap-4">
                  <Icon className="h-6 w-6" />
                  <span className="font-semibold">{label}</span>
                </li>
              </Link>
            )
          })}
        </ul>
        <div className="p-6 items-center flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/eliasnsz.png" alt="" />
          </Avatar>
          <div className="-space-y-1 flex-1">
            <h4 className="font-bold text-foreground">Elias Souza</h4>
            <span className="block text-muted-foreground">@eliasnsz</span>
          </div>
          <button>
            <MoreHorizontal className="text-muted-foreground hover:text-foreground transition-colors h-5 w-5" />
          </button>
        </div>
      </nav>
    </aside>
  )
}
