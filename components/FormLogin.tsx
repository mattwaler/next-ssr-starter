import axios from 'axios'
import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  async function login(event) {
    event.preventDefault()
    const { data } = await axios.post('/api/auth', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
    if (data.success) {
      router.push('/')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <form onSubmit={event => login(event)}>
      <h2 className="font-bold text-2xl">Log In</h2>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" ref={emailInput} type="text" />
      </label>
      <label className="block mt-2">
        <p>Password:</p>
        <input className="w-96 rounded" ref={passwordInput} type="password" />
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-gray-900 text-white font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
      </label>
    </form>
  )
}
