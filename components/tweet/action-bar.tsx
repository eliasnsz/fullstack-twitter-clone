'use client'

import { useQuery, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { MouseEvent } from 'react'
import {
  BarChart,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat,
  Upload,
} from 'lucide-react'

import { likeTweet } from '@/actions/like-tweet'
import { Tweet } from '@/types/tweet'
import { api } from '@/lib/api'

type ActionBarProps = { tweet: Tweet; isReply?: boolean }

export function ActionBar({ tweet, isReply }: ActionBarProps) {
  const { data: session } = useSession()
  const { data } = useQuery(
    `action-bar-${tweet.id}`,
    async () =>
      await api.get<{ likes: number; isLiked: boolean }>(
        `/tweets/${tweet.id}/analytics/${session?.user.id}`,
      ),
  )

  const queryClient = useQueryClient()
  const likes = data?.data.likes
  const isLiked = data?.data.isLiked

  async function handleLike(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    const userId = session?.user.id

    if (!session || !userId) {
      throw new Error('Você deve estar autenticado')
    }

    await likeTweet({ tweetId: tweet.id, userId })
    queryClient.invalidateQueries(`action-bar-${tweet.id}`)
  }

  return (
    <div className="mt-3 z-10 text-muted-foreground flex justify-between pr-1.5">
      {/* Comments */}
      <button>
        <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
          <div className="relative">
            <MessageCircle className="h-5 w-5 rounded-full transition-colors" />
            <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs">
            {tweet._count?.rootChildren || tweet._count?.children || 0}
          </span>
        </div>
      </button>
      {/* Re-tweets */}
      <button>
        <div className="transition-colors hover:text-emerald-600 group flex items-center gap-2">
          <div className="relative">
            <Repeat className="h-5 w-5 rounded-full transition-colors" />
            <div className="transition-colors w-full h-full group-hover:bg-emerald-600/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs">{tweet.retweets}</span>
        </div>
      </button>
      {/* Likes */}
      <button onClick={(event) => handleLike(event)}>
        <div className="transition-colors hover:text-rose-500 group flex items-center gap-2">
          <div className="relative">
            <Heart
              className={`${
                isLiked ? 'text-red-500 fill-red-500' : 'fill-transparent'
              } h-5 w-5 rounded-full transition-colors`}
            />
            <div className="transition-colors w-full h-full group-hover:bg-rose-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs">{likes || 0}</span>
        </div>
      </button>
      {/* Views */}
      <button>
        <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
          <div className="relative">
            {isReply ? (
              <Bookmark className="h-5 w-5 rounded-full transition-colors" />
            ) : (
              <BarChart className="h-5 w-5 rounded-full transition-colors" />
            )}
            <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span className="text-xs">{tweet.views}</span>
        </div>
      </button>
      {/* Upload */}
      <button>
        <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
          <div className="relative">
            <Upload className="h-5 w-5 rounded-full transition-colors" />
            <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </button>
    </div>
  )
}
