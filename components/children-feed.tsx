'use client'

import { api } from '@/lib/api'
import { Tweet as TweetType } from '@/types/tweet'
import React from 'react'
import { useQuery } from 'react-query'
import { Tweet } from './tweet'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'

interface Params {
  params: {
    username: string
    id: string
  }
}

export function ChildrenFeed({ params }: Params) {
  const { id, username } = params

  const { data: children, isLoading } = useQuery(`children-${id}`, async () => {
    const { data } = await api.get<TweetType[] | []>(
      `/user/${username}/tweets/${id}/children`,
    )
    return data
  })

  if (isLoading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-4 px-4 py-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {children?.map((tweet) => (
        <React.Fragment key={tweet.id}>
          <Tweet.Root
            className={`${tweet.children.length ? 'border-none' : ''} relative`}
            tweet={tweet}
          >
            {tweet.children.length > 0 && (
              <div className="w-0.5 left-[34px] absolute h-full bg-border" />
            )}

            <Tweet.Profile tweet={tweet} />
            <Tweet.ContentRoot>
              <Tweet.UserInfo tweet={tweet} />
              <Tweet.TextContent value={tweet.text} />
              <Tweet.Hashtags hashtags={tweet.hashtags} />
              <Tweet.Media media={tweet.media} />
              <Tweet.ActionBar tweet={tweet} />
            </Tweet.ContentRoot>
          </Tweet.Root>

          {tweet.children.length
            ? tweet.children.map((children) => (
                <React.Fragment key={children.id}>
                  <Tweet.Root
                    className={`${
                      tweet.children.length ? 'border-none' : ''
                    } relative`}
                    tweet={tweet}
                  >
                    {tweet.children.length > 1 && (
                      <div className="w-0.5 left-[34px] absolute h-full bg-border" />
                    )}
                    <Tweet.Profile tweet={children} />
                    <Tweet.ContentRoot>
                      <Tweet.UserInfo tweet={children} />
                      <Tweet.TextContent value={children.text} />
                      <Tweet.Hashtags hashtags={children.hashtags} />
                      <Tweet.Media media={children.media} />
                      <Tweet.ActionBar tweet={children} />
                    </Tweet.ContentRoot>
                  </Tweet.Root>
                  {tweet.children.length > 1 && (
                    <Link
                      href={`/${children.user.username}/status/${children.parentId}`}
                      className="px-4 py-2 block relative group cursor-pointer hover:bg-muted"
                    >
                      <div className="w-fit h-full left-[34px] bg-background gap-1.5 justify-center items-center top-0 absolute flex flex-col">
                        <div className="w-[3px] h-[3px] transition-colors group-hover:bg-muted-foreground rounded-full bg-border" />
                        <div className="w-[3px] h-[3px] transition-colors group-hover:bg-muted-foreground rounded-full bg-border" />
                        <div className="w-[3px] h-[3px] transition-colors group-hover:bg-muted-foreground rounded-full bg-border" />
                      </div>
                      <button className="ml-14 text-sm transition-colors text-muted-foreground group-hover:text-foreground group-hover:underline">
                        Mais comentários
                      </button>
                    </Link>
                  )}
                </React.Fragment>
              ))[0]
            : null}
        </React.Fragment>
      ))}
    </div>
  )
}
