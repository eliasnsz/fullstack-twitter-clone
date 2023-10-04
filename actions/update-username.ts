'use server'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'

interface Props {
  userId: string
  username: string
}

export async function updateUsername({ userId, username }: Props) {
  try {
    const url = `/users/${userId}/update/username`

    const response = await api.put(url, { username })
    const { status } = response.data as { status: number }

    return status
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.statusCode as number
    }
  }
}
