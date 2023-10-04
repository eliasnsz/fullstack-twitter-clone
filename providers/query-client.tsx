'use client'
import { ComponentProps } from 'react'
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from 'react-query'

type Props = ComponentProps<'div'>

export const queryClient = new QueryClient()

export default function QueryClientProvider({ children }: Props) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
