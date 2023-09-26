import { NewPost } from '@/components/new-post'
import { Tweet } from '@/components/tweet'

const tweets = [
  {
    id: '1234567890123456789',
    text: 'the whole comparing typescript to rust or go is tiring. \n\nof course people dont use typescript because of its speed, they use it because they have stockholm syndrome',
    created_at: '2023-09-23T12:34:56Z',
    user: {
      id: '9876543210987654321',
      screen_name: 'eliasnsz',
      name: 'Elias Souza',
      followers_count: 1000,
      profile_image_url: 'https://github.com/eliasnsz.png',
    },
    retweets: 10,
    comments: 8,
    favorites: 20,
    hashtags: ['exemplo', 'twitter'],
    mentions: ['amigo1', 'amigo2'],
  },
  {
    id: '1234567890123456789',
    text: 'the whole comparing typescript to rust or go is tiringof course people dont use typescript because of its speed, they use it because they have stockholm syndrome',
    created_at: '2023-08-13T12:34:56Z',
    user: {
      id: '9876543210987654321',
      screen_name: 'eliasnsz',
      name: 'Elias Souza',
      followers_count: 1000,
      profile_image_url: 'https://github.com/eliasnsz.png',
    },
    retweets: 10,
    comments: 12,
    favorites: 20,
    hashtags: ['exemplo', 'twitter'],
    mentions: ['amigo1', 'amigo2'],
    media: [
      {
        type: 'photo',
        url: 'https://pbs.twimg.com/media/F6opZmibQAAZCGB?format=jpg&name=4096x4096',
      },
    ],
  },
  {
    id: '1234567890123456789',
    text: 'the whole comparing typescript to rust or go is tiringof course people dont use typescript because of its speed, they use it because they have stockholm syndrome',
    created_at: '2023-08-13T12:34:56Z',
    user: {
      id: '9876543210987654321',
      screen_name: 'eliasnsz',
      name: 'Elias Souza',
      followers_count: 1000,
      profile_image_url: 'https://github.com/eliasnsz.png',
    },
    retweets: 10,
    comments: 12,
    favorites: 20,
    hashtags: ['exemplo', 'twitter'],
    mentions: ['amigo1', 'amigo2'],
    media: [
      {
        type: 'video',
        url: 'https://i.imgur.com/oQQP5IP.mp4',
      },
    ],
  },
]

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
      {/* New Post Section */}
      <NewPost />

      <div className="h-screen divide-y divide-border ">
        {tweets.map((tweet, index) => {
          return <Tweet key={index} tweet={tweet} />
        })}
      </div>
    </div>
  )
}
