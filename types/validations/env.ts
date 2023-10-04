import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: any) => {
    if (env === process.env.NODE_ENV && !value) {
      return false
    }
    return true
  }
}

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),
  DATABASE_URL: z.string().url(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  GITHUB_ID: z.string().min(1),
  GOOGLE_SECRET: z.string().min(1),
  GOOGLE_ID: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().refine(requiredOnEnv('development')),
})

export const env = envSchema.parse(process.env)
