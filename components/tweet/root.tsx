'use client'
import { ComponentProps } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Tweet } from '@/types/tweet'

interface Props extends ComponentProps<'div'> {
  tweet: Tweet
}

export function Root({ className, tweet, ...props }: Props) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/${tweet.user.username}/status/${tweet.id}`)}
      className={cn(
        'px-4 py-3 gap-4 flex hover:bg-muted cursor-pointer  border-b border-b-border',
        className,
      )}
      {...props}
    />
  )
}
