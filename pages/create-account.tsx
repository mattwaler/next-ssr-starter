import axios from 'axios'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import withSession from 'helpers/session'
import redirect from 'helpers/redirect'

export default function Create() {
  const router = useRouter()
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  async function create() {
    const { data } = await axios.post('/api/user', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
    if (data.success) {
      router.push('/login')
    }
  }
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Create an Account</h1>
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
              onClick={create}
            >
              Create Account
            </button>
          </div>
        </label>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async (context: Context) => {
  if (context.req.session.get('user') !== undefined) {
    return redirect('/')
  }
  return { props: {} }
})