import { MoreHorizontal } from 'lucide-react'

import { Tweet } from '@/types/tweet'
import { VerifiedIcon } from '../verified-icon'
import { dayjs } from '@/lib/dayjs'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface Props extends ComponentProps<'div'> {
  tweet: Tweet
  reply?: boolean
}

export function UserInfo({ tweet, reply = false, className }: Props) {
  if (reply) {
    return (
      <div className={cn('w-full flex items-start justify-between', className)}>
        <div className="-space-y-0.5">
          <div className="flex flex-1 items-center">
            <Link className="block" href={`/${tweet.user.username}`}>
              <h4 className="font-bold text-foreground hover:underline mr-1">
                {tweet.user.name}
              </h4>
            </Link>
            {tweet.user.verified && <VerifiedIcon />}
          </div>
          <Link className="block" href={`/${tweet.user.username}`}>
            <h6 className="text-muted-foreground text-sm">
              @{tweet.user.username}
            </h6>
          </Link>
        </div>

        <button>
          <MoreHorizontal className="h-8 text-muted-foreground hover:muted transition-colors w-8 p-2 rounded-full" />
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex gap-1 flex-1 items-center">
        <Link href={`/${tweet.user.username}`}>
          <h4 className="font-bold text-foreground hover:underline">
            {tweet.user.name}
          </h4>
        </Link>
        {tweet.user.verified && <VerifiedIcon />}
        <Link href={`/${tweet.user.username}`}>
          <h6 className="text-muted-foreground text-sm">
            @{tweet.user.username}
          </h6>
        </Link>
        <span className="text-muted-foreground text-sm">
          {' '}
          · {dayjs(tweet.created_at).fromNow()}
        </span>
      </div>
      <button>
        <MoreHorizontal className="h-8 text-muted-foreground hover:muted transition-colors w-8 p-2 rounded-full" />
      </button>
    </div>
  )
}
