import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type WallpaperProps = ComponentProps<'img'>

export function Wallpaper({ src, className, ...props }: WallpaperProps) {
  const Slot = src ? 'img' : 'div'

  return (
    // eslint-disable-next-line
    <Slot
      src={src}
      alt="user-wallpaper"
      className={cn(
        `h-56 bg-muted-foreground/25 aspect-video w-full`,
        className,
      )}
      {...props}
    />
  )
}
