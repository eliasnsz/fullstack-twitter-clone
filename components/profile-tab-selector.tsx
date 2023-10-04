'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  username: string
}

export function ProfileTabSelector({ username }: Props) {
  const path = usePathname()

  const navigation = [
    { name: 'Posts', href: `/${username}` },
    { name: 'Replies', href: `/${username}/replies` },
    { name: 'Mídias', href: `/${username}/media` },
    { name: 'Curtidas', href: `/${username}/likes` },
  ]

  return (
    <div className="flex border-b border-b-border">
      {navigation.map(({ name, href }) => {
        return (
          <Link
            key={name}
            href={href}
            data-selected={href === path}
            className="flex-1 data-[selected=true]:font-semibold data-[selected=true]:text-foreground hover:bg-muted text-center text-muted-foreground"
          >
            <div className="relative py-3 px-2 m-auto w-fit">
              {name}
              <div
                data-selected={href === path}
                className="data-[selected=false]:invisible absolute rounded-full bottom-0 left-1/2 h-[5px] w-full -translate-x-1/2 bg-blue-500"
              />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
