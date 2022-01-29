import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Create() {
  const router = useRouter()
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  async function create(event: React.FormEvent) {
    event.preventDefault()
    const { data } = await axios.post('/api/user', {
      email: emailInput?.current?.value,
      password: passwordInput?.current?.value,
    })
    return data.success
      ? router.push('/login')
      : toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={create}>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" ref={emailInput} type="text" />
      </label>
      <label className="block mt-2">
        <p>Password:</p>
        <input className="w-96 rounded" ref={passwordInput} type="password" />
        <div className="mt-4">
          <button className="px-4 py-2 bg-gray-900 text-white font-bold" type="submit">
            Create Account
          </button>
        </div>
      </label>
    </form>
  )
}
