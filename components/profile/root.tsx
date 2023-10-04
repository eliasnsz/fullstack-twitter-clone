import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type RootProps = ComponentProps<'div'>

export function Root({ className, ...props }: RootProps) {
  return <div className={cn(className)} {...props} />
}
