'use server'
import { api } from '@/lib/api'
import { PaginationResponse } from '@/types/responses/pagination-response'
import { Tweet } from '@/types/tweet'

export interface FeedFetchProps {
  page?: number
  limit?: number
  username?: string
  onlyReplies?: boolean
  queryName?: string
}

export async function getTweets({
  page,
  limit,
  username,
  onlyReplies,
}: FeedFetchProps) {
  const url = `/tweets?page=${page}&limit=${limit}
  ${onlyReplies ? `&onlyReplies=${Number(onlyReplies)}` : ''}
  ${username ? `&username=${username}` : ''}
  `
  const response = await api.get<PaginationResponse<Tweet[]>>(url)
  const data = response.data

  return data
}
