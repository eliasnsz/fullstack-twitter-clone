import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  image: z.string().url(),
})

export const updateUserSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    email: z.string(),
    description: z.string(),
    location: z.string(),
    followers_count: z.number(),
    following_count: z.number(),
    tweets_count: z.number(),
    created_at: z.string(),
    birthday: z.string(),
    profile_image_url: z.string(),
    cover_image_url: z.string(),
    verified: z.boolean(),
  })
  .partial()
