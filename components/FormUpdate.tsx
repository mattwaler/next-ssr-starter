import axios from 'axios'
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { usePageContext } from 'components/Page'

export default function Update() {
  const { user } = usePageContext()
  const emailInput = useRef(null)
  const nameInput = useRef(null)

  async function update(event) {
    event.preventDefault()
    const { data } = await axios.patch('/api/user', {
      email: emailInput.current.value,
      name: nameInput.current.value,
    })
    if (data.success) {
      return toast.success('Details updated successfully.')

    }
    return toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={update}>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" ref={emailInput} name="email" type="text" defaultValue={user.email} />
      </label>
      <label className="block mt-2">
        <p>Name:</p>
        <input className="w-96 rounded" ref={nameInput} name="name" type="text" defaultValue={user.name ?? ''} />
        <div className="mt-4">
          <button className="px-4 py-2 bg-gray-900 text-white font-bold" type="submit">
            Update
          </button>
        </div>
      </label>
    </form>
  )
}