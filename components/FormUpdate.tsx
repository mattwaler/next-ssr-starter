import axios from 'axios'
import useUserContext from 'contexts/UserContext'
import { createFormObject } from 'lib/client'
import { toast } from 'react-hot-toast'

export default function Update() {
  const user = useUserContext()

  async function update(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = createFormObject(event.currentTarget)
    const { data } = await axios.patch('/api/user', form)
    return data.success
      ? toast.success('Details updated successfully.')
      : toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={update}>
      <label className="block">
        <p>Email:</p>
        <input
          className="w-96 rounded"
          name="email"
          type="text"
          defaultValue={user?.email}
        />
      </label>
      <label className="mt-2 block">
        <p>Name:</p>
        <input
          className="w-96 rounded"
          name="name"
          type="text"
          defaultValue={user?.name ?? ''}
        />
        <div className="mt-4">
          <button
            className="bg-gray-900 px-4 py-2 font-bold text-white"
            type="submit"
          >
            Update
          </button>
        </div>
      </label>
    </form>
  )
}
