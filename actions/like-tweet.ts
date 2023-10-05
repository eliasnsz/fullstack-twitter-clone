'use server'
import { api } from '@/lib/api'

interface Props {
  userId: string
  tweetId: string
}

export async function likeTweet({ userId, tweetId }: Props) {
  try {
    const url = `/tweets/${tweetId}/like`

    const response = await api.post(url, { userId })
    const data = response.data

    return data
  } catch (error) {
    return null
  }
}
