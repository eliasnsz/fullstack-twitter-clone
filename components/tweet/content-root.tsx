import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'>

export function ContentRoot(props: Props) {
  return (
    <div
      className={cn('flex flex-1 flex-col -mt-2', props.className)}
      {...props}
    />
  )
}
