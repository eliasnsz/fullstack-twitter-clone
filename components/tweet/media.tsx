type MediaProps = {
  media?: {
    type: string
    url: string
  }[]
}

export function Media({ media }: MediaProps) {
  if (!media?.length) {
    return null
  }

  return (
    <div className="my-1">
      {media.map((media, index) => {
        if (media.type === 'photo') {
          return (
            <div
              key={index}
              className="rounded-xl border border-border overflow-hidden"
            >
              {/* eslint-disable-next-line */}
              <img src={media.url} alt="" />
            </div>
          )
        }
        if (media.type === 'video') {
          return (
            <div
              key={index}
              className="rounded-xl max-h-[600px] object-contain border border-border overflow-hidden"
            >
              <video
                className="w-full aspect-video"
                src={media.url}
                controls={true}
              />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
