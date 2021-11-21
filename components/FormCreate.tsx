import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'

export default function Create() {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  async function create(event) {
    event.preventDefault()
    const { data } = await axios.post('/api/user', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
    if (data.success) {
      return toast.success('Account created successfully! Please log in.')
    }
    return toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={event => create(event)}>
      <h2 className="font-bold text-2xl">Create an Account</h2>
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
            Create Account
          </button>
        </div>
      </label>
    </form>
  )
}
