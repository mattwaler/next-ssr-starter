import axios from 'axios'
import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Page'
import withSession from 'helpers/session'
import { toast } from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  async function login(event) {
    event.preventDefault()
    const { data } = await axios.post('/api/login', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
    if (data.success) {
      router.push('/')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <Page>
      <form className="container py-8">
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
      </form>
    </Page>
  )
}

export const getServerSideProps = withSession(async (context) => {
  const session = context.req.session.get('user')
  if (session) {
    return { redirect: { location: '/', permanent: false, } }
  }
  return { props: {} }
})
