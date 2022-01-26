import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePageContext } from 'components/Page'
import { LightningBoltIcon } from '@heroicons/react/solid'

export default function Nav() {
  const router = useRouter()
  const { user } = usePageContext()

  async function logout() {
    const { data } = await axios.delete('/api/auth')
    data.success && router.push('/')
  }

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <LightningBoltIcon className="w-6 h-6" />
            <span className="font-bold">Next SSR Starter</span>
          </a>
        </Link>
        <nav className="space-x-4">
          {user && (
            <>
              <Link href="/account">
                <a>Account</a>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link href="/login">
                <a>Login</a>
              </Link>
              <Link href="/create">
                <a>Create Account</a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
