import { User } from './user'

export interface Tweet {
  id: string
  text: string
  created_at: string
  user: User
  retweets: number
  comments: number
  likes: number
  views: number
  hashtags: string[] | []
  mentions: string[] | []
  media:
    | []
    | {
        type: string
        url: string
      }[]
}
