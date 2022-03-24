import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { createFormObject } from 'lib/helpers'

export default function Login() {
  const router = useRouter()

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = createFormObject(event.currentTarget)
    const { data } = await axios.post('/api/auth', form)
    return data.success ? router.push('/') : toast.error(data.message)
  }

  return (
    <form onSubmit={login}>
      <label className="block">
        <p>Email:</p>
        <input className="w-96 rounded" name="email" type="email" />
      </label>
      <label className="block mt-2">
        <p>Password:</p>
        <input className="w-96 rounded" name="password" type="password" />
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
