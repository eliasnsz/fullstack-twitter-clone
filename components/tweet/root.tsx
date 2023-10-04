import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Tweet } from '@/types/tweet'

interface Props extends ComponentProps<'div'> {
  tweet: Tweet
}

export function Root({ className, tweet, ...props }: Props) {
  return (
    <Link href={`/${tweet.user.username}/status/${tweet.id}`}>
      <div
        className={cn(
          'px-4 py-3 gap-4 flex hover:bg-muted border-b border-b-border',
          className,
        )}
        {...props}
      />
    </Link>
  )
}
