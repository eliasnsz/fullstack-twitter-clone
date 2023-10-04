import { User2 } from 'lucide-react'

import { Tweet } from '@/types/tweet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

interface Props {
  tweet: Tweet
}

export function Profile({ tweet }: Props) {
  const src = tweet.user.profile_image_url || ''

  return (
    <Link href={`/${tweet.user.username}`} className="h-fit">
      <Avatar className="border border-border">
        <AvatarFallback className="grid place-items-center m-auto">
          <User2 className="text-muted-foreground" />
        </AvatarFallback>
        <AvatarImage src={src} />
      </Avatar>
    </Link>
  )
}
