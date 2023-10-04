'use client'
import TextArea from 'react-textarea-autosize'
import { Calendar } from 'lucide-react'

import { User } from '@/types/user'
import { dayjs } from '@/lib/dayjs'
import { VerifiedIcon } from '../verified-icon'
import { ProfileImage } from './profile-image'
import { Wallpaper } from './wallpaper'
import { Root } from './root'

interface ProfileProps {
  user: User | null
  username: string
}

export function Profile({ user, username }: ProfileProps) {
  if (!user) {
    return (
      <Root>
        <Wallpaper />
        <ProfileImage />
        <div className="mx-6 my-4">
          <h4 className="text-xl font-extrabold">@{username}</h4>
        </div>
        <div className="py-16 grid place-items-center">
          <div>
            <h4 className="text-3xl font-extrabold text-foreground">
              Esse usuário não existe
            </h4>
            <p className="text-sm text-muted-foreground">
              Tente procurar por outro(a).
            </p>
          </div>
        </div>
      </Root>
    )
  }

  return (
    <Root>
      <Wallpaper src={user.cover_image_url || undefined} />
      <ProfileImage src={user.profile_image_url || undefined} />
      <div className="mx-6 space-y-2.5 my-4">
        {/* UserInfo */}
        <div className="flex items-start gap-1">
          <div className="-space-y-1">
            <h4 className="text-xl font-extrabold text-foreground">
              {user.name}
            </h4>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          <div className="mt-0.5">{user.verified && <VerifiedIcon />}</div>
        </div>
        {/* Bio */}
        {user.description && (
          <TextArea
            readOnly
            className="text-sm block border-none leading-snug bg-inherit text-foreground w-full resize-none remove-scrollbar outline-none"
            value={user.description}
          />
        )}
        {/* Additional Info */}
        <div>
          <div className="text-muted-foreground flex items-center gap-1">
            <Calendar className=" h-4 w-4" />
            <span className="text-sm">
              Entrou em {dayjs(user.created_at).format('MMM [de] YYYY')}
            </span>
          </div>
        </div>
        {/* Followers */}
        <div className="text-muted-foreground text-sm flex items-center gap-3">
          <p>
            <span className="font-extrabold text-foreground">
              {user.following_count}
            </span>{' '}
            Seguindo
          </p>
          <p>
            <span className="font-extrabold text-foreground">
              {' '}
              {user.followers_count}
            </span>{' '}
            Seguindo
          </p>
        </div>
      </div>
    </Root>
  )
}
