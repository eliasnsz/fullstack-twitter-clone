import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type WallpaperProps = ComponentProps<'img'>

export function ProfileImage({ src, className, ...props }: WallpaperProps) {
  const Slot = src ? 'img' : 'div'

  return (
    // eslint-disable-next-line
    <Slot
      src={src}
      alt="user-wallpaper"
      className={cn(
        `relative bg-muted ring-4 ring-background mx-6 w-32 rounded-full -mt-16 aspect-square`,
        className,
      )}
      {...props}
    />
  )
}
