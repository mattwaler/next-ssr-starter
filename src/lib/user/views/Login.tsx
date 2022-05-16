import axios from 'axios'
import createFormObject from 'lib/helpers/createFormObject'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

export default function Login() {
  const router = useRouter()

  async function login(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const form = createFormObject(event.currentTarget)
      const { data } = await axios.post('/api/user/login', form)
      if (!data.success) throw new Error(data.message)
      return router.push('/')
    } catch(error) {
      console.error(error)
      return toast.error(error.message)
    }
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
