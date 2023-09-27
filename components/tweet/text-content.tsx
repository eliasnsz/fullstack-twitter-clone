'use client'
import TextArea from 'react-textarea-autosize'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface Props extends ComponentProps<'textarea'> {
  value: string
}

export function TextContent({ value, className }: Props) {
  return (
    <TextArea
      readOnly
      value={value}
      className={cn(
        'pr-4 block my-1 border-none leading-snug bg-inherit text-foreground -mt-1 w-full resize-none remove-scrollbar outline-none',
        className,
      )}
    />
  )
}
