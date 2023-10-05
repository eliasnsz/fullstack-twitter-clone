'use server'
import { api } from '@/lib/api'

interface Props {
  userId: string
  tweetId: string
}

export async function unlikeTweet({ userId, tweetId }: Props) {
  try {
    const url = `/tweets/${tweetId}/unlike`

    const response = await api.post(url, { userId })
    const data = response.data

    return data
  } catch (error) {
    return null
  }
}
