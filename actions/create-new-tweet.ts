'use server'
import { z } from 'zod'

import { api } from '@/lib/api'
import { createTweetSchema } from '@/types/validations/tweet'

type CreateTweetProps = z.infer<typeof createTweetSchema>

export async function createNewTweet(props: CreateTweetProps) {
  const response = await api.post('/tweets', { ...props })

  return response.data
}
