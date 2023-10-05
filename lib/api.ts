import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://fullstack-twitter-clone.vercel.app/api'
    : 'http://localhost:3000/api'

export const api = axios.create({
  baseURL,
})
