import React from 'react'

import { ArrowBack } from '@/components/arrow-back'
import { Tweet as TweetType } from '@/types/tweet'
import { Tweet } from '@/components/tweet'
import { api } from '@/lib/api'
import { dayjs } from '@/lib/dayjs'
import { NewReplyForm } from '@/components/new-reply-form'
import { ChildrenFeed } from '@/components/children-feed'

interface Params {
  params: { id: string; username: string }
}

export default async function PostPage({ params }: Params) {
  const { id, username } = params

  const { data: tweet } = await api.get<TweetType>(
    `/user/${username}/tweets/${id}`,
  )

  return (
    <div>
      <nav className="sticky mb-4 top-0 backdrop-blur-lg bg-transparent p-2 flex items-center gap-6">
        <ArrowBack />
        <h4 className="text-xl mt-0.5 font-extrabold text-foreground">
          Perfil
        </h4>
      </nav>
      <div>
        <div className="px-3.5">
          <div className="flex relative items-center gap-3">
            <Tweet.Profile tweet={tweet} />
            <Tweet.UserInfo reply tweet={tweet} />
          </div>
        </div>
        <div className="px-4 mt-4">
          <Tweet.TextContent className="cursor-auto" value={tweet.text} />
          <div className="capitalize text-sm text-muted-foreground">
            <span className="inline-block my-3">
              {dayjs(tweet.created_at).format('HH:mm [-] MMM D[, ]YYYY')}
            </span>
            {' - '}
            <span className="inline-block">
              <span className="text-foreground font-bold">{tweet.views}</span>{' '}
              visualizações
            </span>
          </div>
        </div>
        <div className="pb-3 border-y mx-4 border-y-border">
          <Tweet.ActionBar isReply tweet={tweet} />
        </div>
        <div className="pt-2">
          <NewReplyForm tweet={tweet} />
        </div>
      </div>
      <ChildrenFeed params={params} />
    </div>
  )
}
