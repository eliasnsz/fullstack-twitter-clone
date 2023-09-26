'use client'
import TextArea from 'react-textarea-autosize'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { Tweet } from '@/types/tweet'
import {
  MoreHorizontal,
  MessageCircle,
  Repeat,
  Heart,
  BarChart,
  Upload,
} from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
dayjs.locale('pt-br')

type Props = { tweet: Tweet }

export function Tweet({ tweet }: Props) {
  return (
    <div className="px-4 py-3 gap-4 flex hover:bg-muted cursor-pointer">
      <Avatar>
        <AvatarImage src={tweet.user.profile_image_url} />
      </Avatar>
      <div className="flex-1 -mt-2 flex flex-col">
        <div className="flex items-center">
          <div className="flex gap-1 flex-1">
            <h4 className="font-bold text-foreground hover:underline">
              {tweet.user.name}
            </h4>
            <h6 className="text-muted-foreground">@{tweet.user.screen_name}</h6>
            <span className="text-muted-foreground capitalize">
              {' '}
              · {dayjs(tweet.created_at).format('MMM DD')}
            </span>
          </div>
          <button>
            <MoreHorizontal className="h-8 text-muted-foreground hover:text-foreground transition-colors w-8 p-2 hover:bg-muted rounded-full" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {/* Text Content */}
          <TextArea
            readOnly
            value={tweet.text}
            className="pr-4 border-none leading-snug bg-inherit text-foreground -mt-1 w-full resize-none remove-scrollbar outline-none"
          />

          {/* Hashtags */}
          {tweet.hashtags && (
            <div className="space-x-1">
              {tweet.hashtags.map((hashtag, index) => (
                <Link
                  href="#"
                  className="text-blue-500 hover:underline inline-block"
                  key={index}
                >
                  #{hashtag}
                </Link>
              ))}
            </div>
          )}

          {/* Medias */}
          {tweet.media && (
            <div>
              {tweet.media.map((media, index) => {
                if (media.type === 'photo') {
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-border overflow-hidden"
                    >
                      {/* eslint-disable-next-line */}
                    <img className="w-full" src={media.url} alt="" />
                    </div>
                  )
                }
                return (
                  <div
                    key={index}
                    className="rounded-xl max-h-[600px] object-contain border border-border overflow-hidden"
                  >
                    <video
                      className="w-full aspect-video"
                      src={media.url}
                      controls={true}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="mt-3 text-muted-foreground flex justify-between">
          <button>
            <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
              <div className="relative">
                <MessageCircle className="h-5 w-5 rounded-full transition-colors" />
                <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs">{tweet.comments}</span>
            </div>
          </button>
          <button>
            <div className="transition-colors hover:text-emerald-600 group flex items-center gap-2">
              <div className="relative">
                <Repeat className="h-5 w-5 rounded-full transition-colors" />
                <div className="transition-colors w-full h-full group-hover:bg-emerald-600/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs">{tweet.retweets}</span>
            </div>
          </button>
          <button>
            <div className="transition-colors hover:text-rose-500 group flex items-center gap-2">
              <div className="relative">
                <Heart className="h-5 w-5 rounded-full transition-colors" />
                <div className="transition-colors w-full h-full group-hover:bg-rose-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs">{tweet.retweets}</span>
            </div>
          </button>
          <button>
            <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
              <div className="relative">
                <BarChart className="h-5 w-5 rounded-full transition-colors" />
                <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs">{tweet.retweets}</span>
            </div>
          </button>
          <button>
            <div className="transition-colors hover:text-blue-500 group flex items-center gap-2">
              <div className="relative">
                <Upload className="h-5 w-5 rounded-full transition-colors" />
                <div className="transition-colors w-full h-full group-hover:bg-blue-500/30 p-4 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
