import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePageContext } from 'components/Page'
import axios from 'axios'

export default function Nav() {
  const router = useRouter()
  const { user } = usePageContext()

  const links = [
    { name: 'Create Account', url: '/create-account' },
    { name: 'Login', url: '/login' },
  ]

  async function logout() {
    const { data } = await axios.delete('/api/auth')
    data.success && router.push('/')
  }

  return (
    <header className="container flex items-center justify-between py-8">
      <Link href="/">
        <a className="underline">Home</a>
      </Link>
      <nav className="space-x-4">
        {/* Logged In */}
        {user && (
          <button className="underline" onClick={logout}>
            Logout
          </button>
        )}
        {/* Logged Out */}
        {!user && (
          <Link href="/auth">
            <a className="underline">Login / Sign Up</a>
          </Link>
        )}
      </nav>
    </header>
  )
}
