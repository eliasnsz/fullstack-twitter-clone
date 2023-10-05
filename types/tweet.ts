import { User } from './user'

export interface Tweet {
  id: string
  text: string
  created_at: string
  user: User
  retweets: number
  comments: number
  views: number
  children: Tweet[] | []
  hashtags: string[] | []
  mentions: string[] | []
  media:
    | []
    | {
        type: string
        url: string
      }[]
  parentId: string | null
  rootId: string | null
  _count: {
    children: number
    rootChildren: number
    likes: number
  }
}
