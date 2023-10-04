import { Feed } from '@/components/feed'

interface Params {
  params: { username: string; pathname: string }
}

export default function Replies({ params: { username } }: Params) {
  return (
    <Feed
      limit={10}
      onlyReplies={true}
      username={username}
      queryName={`replies-${username}`}
    />
  )
}
