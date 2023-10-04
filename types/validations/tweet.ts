import { z } from 'zod'

export const createTweetSchema = z.object({
  text: z.string(),
  userId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  rootId: z.string().uuid().optional().nullable(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
})
