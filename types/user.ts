export interface User {
  id: string
  username: string
  name: string
  email: string
  description: string | null
  location: string | null
  followers_count: number
  following_count: number
  tweets_count: number
  created_at: string
  birthday: string
  profile_image_url: string | null
  cover_image_url: string | null
  verified: boolean
}
