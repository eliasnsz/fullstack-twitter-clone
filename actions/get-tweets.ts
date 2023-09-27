'use server'
import { api } from '@/lib/api'
import { PaginationResponse } from '@/types/responses/pagination-response'
import { Tweet } from '@/types/tweet'

interface Props {
  page: number
  limit: number
}

export async function getTweets({ page, limit }: Props) {
  const url = `/tweets?page=${page}&limit=${limit}`

  const response = await api.get<PaginationResponse<Tweet[]>>(url)
  const data = response.data

  return data
}
