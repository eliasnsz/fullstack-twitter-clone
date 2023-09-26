export interface Tweet {
  id: string
  text: string
  created_at: string
  user: {
    id: string
    screen_name: string
    name: string
    followers_count: number
    profile_image_url: string
  }
  retweets: number
  comments: number
  favorites: number
  hashtags?: string[]
  mentions?: string[]
  media?: {
    type: string
    url: string
  }[]
}
