import axios from 'axios'
import type { NextRouter } from 'next/router'
import type { QueryClient } from 'react-query'

export function createFormObject(form: HTMLFormElement) {
  const data = new FormData(form)
  return Object.fromEntries(data.entries())
}

export async function getUser() {
  const { data } = await axios.get('/api/auth')
  return data
}

export async function logout(queryClient: QueryClient, router: NextRouter) {
  const { data } = await axios.delete('/api/auth')
  console.log(data.success)
  if (data.success) {
    queryClient.invalidateQueries('user')
    router.push('/')
  }
}
