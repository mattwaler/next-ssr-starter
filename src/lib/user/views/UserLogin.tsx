import axios from 'axios'
import createFormObject from 'lib/helpers/createFormObject'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function UserLogin() {
  const router = useRouter()

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = createFormObject(event.currentTarget)
    const { data } = await axios.post('/api/user/login', form)
    return data.success ? router.push('/') : toast.error(data.message)
  }

  return (
    <form onSubmit={login} className="grid grid-cols-1 gap-6">
      <label>
        <p>Email:</p>
        <input className="input" name="email" type="email" />
      </label>
      <label>
        <p>Password:</p>
        <input className="input" name="password" type="password" />
      </label>
      <button className="button" type="submit">
        Login
      </button>
    </form>
  )
}
