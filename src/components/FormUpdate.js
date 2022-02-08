import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useUser } from './Page'
import { createFormObject } from 'lib/helpers'

export default function Update() {
  const user = useUser()

  async function update(event) {
    event.preventDefault()
    const form = createFormObject(event.target)
    const { data } = await axios.patch('/api/user', form)
    return data.success
      ? toast.success('Details updated successfully.')
      : toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={update}>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" name="email" type="text" defaultValue={user?.email} />
      </label>
      <label className="block mt-2">
        <p>Name:</p>
        <input className="w-96 rounded" name="name" type="text" defaultValue={user?.name ?? ''} />
        <div className="mt-4">
          <button className="px-4 py-2 bg-gray-900 text-white font-bold" type="submit">
            Update
          </button>
        </div>
      </label>
    </form>
  )
}
