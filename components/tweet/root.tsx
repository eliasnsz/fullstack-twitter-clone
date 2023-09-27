import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'>

export function Root(props: Props) {
  return (
    <div
      className={cn(
        'px-4 py-3 gap-4 flex hover:bg-muted cursor-pointer border-b border-b-border',
        props.className,
      )}
      {...props}
    />
  )
}
