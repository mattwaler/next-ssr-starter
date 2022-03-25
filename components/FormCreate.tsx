import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { createFormObject } from 'lib/client'

export default function Create() {
  const router = useRouter()

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = createFormObject(event.currentTarget)
    const { data } = await axios.post('/api/user', form)
    return data.success
      ? router.push('/login')
      : toast.error('Something went wrong. Try again later.')
  }

  return (
    <form onSubmit={create}>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" name="email" type="email" />
      </label>
      <label className="mt-2 block">
        <p>Password:</p>
        <input className="w-96 rounded" name="password" type="password" />
        <div className="mt-4">
          <button
            className="bg-gray-900 px-4 py-2 font-bold text-white"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </label>
    </form>
  )
}
