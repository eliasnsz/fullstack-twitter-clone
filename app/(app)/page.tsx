import { Feed } from '@/components/feed'
import { NewTweetForm } from '@/components/new-tweet-form'

export default function Home() {
  return (
    <div className="remove-scrollbar relative overflow-y-scroll h-screen">
      {/* Header */}
      <header className="sticky z-20 top-0 bg-transparent backdrop-blur-xl border-b flex flex-col justify-between border-b-border">
        <h2 className="text-xl px-3 py-2 tracking-tight text-foreground font-bold">
          Home
        </h2>
        <div className="flex font-semibold text-muted-foreground">
          <div className="flex-1 text-center hover:bg-muted-foreground/10 hover:text-foreground cursor-pointer transition-colors py-3">
            For You
          </div>
          <div className="flex-1 text-center hover:bg-muted-foreground/10 hover:text-foreground cursor-pointer transition-colors py-3">
            Seguindo
          </div>
        </div>
      </header>
      <NewTweetForm />
      <Feed queryName="tweets" onlyReplies={false} limit={10} />
    </div>
  )
}
