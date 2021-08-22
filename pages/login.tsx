import axios from 'axios'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import withSession from 'helpers/session'

export default function Login() {
  const router = useRouter()
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  async function login() {
    const { data } = await axios.post('/api/login', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
    if (data.success) {
      router.push('/')
    }
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Log In</h1>
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
              onClick={login}
            >
              Login
            </button>
          </div>
        </label>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async (context: Context) => {
  const session = context.req.session.get('user')
  if (session) {
    return {
      redirect: {
        location: '/',
        permanent: false,
      }
    }
  }
  return { props: {} }
})
