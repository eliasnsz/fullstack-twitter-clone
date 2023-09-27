import Link from 'next/link'

type Props = { hashtags: string[] | undefined }

export function Hashtags({ hashtags }: Props) {
  if (!hashtags?.length) {
    return null
  }

  return (
    <div className="space-x-1 my-1">
      {hashtags.map((hashtag, index) => (
        <Link
          href="#"
          className="text-blue-500 hover:underline inline-block"
          key={index}
        >
          #{hashtag}
        </Link>
      ))}
    </div>
  )
}
