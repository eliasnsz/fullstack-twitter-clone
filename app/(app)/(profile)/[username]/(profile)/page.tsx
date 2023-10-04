import { Feed } from '@/components/feed'

interface Params {
  params: { username: string }
}

export default function Posts({ params: { username } }: Params) {
  return <Feed queryName={`feed-${username}`} limit={10} username={username} />
}
