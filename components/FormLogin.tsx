import axios from 'axios'
import { createFormObject } from 'lib/client'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

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
      <label className="mt-2 block">
        <p>Password:</p>
        <input className="w-96 rounded" name="password" type="password" />
        <div className="mt-4">
          <button
            className="bg-gray-900 px-4 py-2 font-bold text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </label>
    </form>
  )
}
