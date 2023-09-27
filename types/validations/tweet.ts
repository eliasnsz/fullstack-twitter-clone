import { z } from 'zod'

export const createTweetSchema = z.object({
  text: z.string(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
})
