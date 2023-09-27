import { Tweet } from '@/types/tweet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
  tweet: Tweet
}

export function Profile({ tweet }: Props) {
  const src = tweet.user.profile_image_url || ''

  return (
    <Avatar>
      <AvatarFallback className="flex items-center justify-center">
        {tweet.user.username[0].toUpperCase()}
      </AvatarFallback>
      <AvatarImage src={src} />
    </Avatar>
  )
}
