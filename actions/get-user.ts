'use server'
import { api } from '@/lib/api'
import { User } from '@/types/user'

interface Props {
  username: string
}

export async function getUser({ username }: Props) {
  try {
    const url = `/user/${username}`

    const response = await api.get<User>(url)
    const data = response.data

    return data
  } catch (error) {
    return null
  }
}
