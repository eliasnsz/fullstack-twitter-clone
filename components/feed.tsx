'use client'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import { getTweets } from '@/actions/get-tweets'
import { Tweet } from './tweet'
import { Skeleton } from './ui/skeleton'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

export function Feed() {
  const { ref, inView } = useInView()

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['tweets'],
    async ({ pageParam = 0 }) =>
      await getTweets({ page: pageParam, limit: 10 }),
    {
      staleTime: 60 * 1000, // 5 seconds
      keepPreviousData: true,
      getNextPageParam: ({ page, total_pages }) =>
        page < total_pages ? page + 1 : undefined,
      getPreviousPageParam: ({ page }) => (page > 0 ? page - 1 : undefined),
    },
  )

  useEffect(() => {
    fetchNextPage()
    // eslint-disable-next-line
  }, [inView])

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
      {data?.pages.map(({ data: tweets }, index) => {
        return (
          <React.Fragment key={index}>
            {tweets?.map((tweet, index) => {
              return (
                <Tweet.Root key={index}>
                  <Tweet.Profile tweet={tweet} />
                  <Tweet.ContentRoot>
                    <Tweet.UserInfo tweet={tweet} />
                    <Tweet.TextContent value={tweet.text} />
                    <Tweet.Hashtags hashtags={tweet.hashtags} />
                    <Tweet.Media media={tweet.media} />
                    <Tweet.ActionBar tweet={tweet} />
                  </Tweet.ContentRoot>
                </Tweet.Root>
              )
            })}
          </React.Fragment>
        )
      })}

      {hasNextPage ? (
        <div ref={ref} className="py-4">
          <Loader2 className="animate-spin m-auto text-muted-foreground" />
        </div>
      ) : (
        <div ref={ref} className="py-4">
          <p className="text-muted-foreground text-center text-sm">
            Não há mais Tweets para exibir.
          </p>
        </div>
      )}
    </div>
  )
}
