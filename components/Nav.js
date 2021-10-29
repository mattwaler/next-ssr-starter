import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePageContext } from 'components/Page'
import axios from 'axios'

export default function Nav() {
  const router = useRouter()
  const context = usePageContext()

  const links = [
    { name: 'Create Account', url: '/create-account' },
    { name: 'Login', url: '/login' },
  ]

  async function logout() {
    const { data } = await axios.post('/api/logout')
    data.success && router.push('/')
  }

  return (
    <header className="container flex items-center justify-between py-8">
      <Link href="/">
        <a className="underline">Home</a>
      </Link>
      <nav className="space-x-4">
        {/* Logged In */}
        {context && (
          <>
            <Link href="/account">
              <a className="underline">Account</a>
            </Link>
            <button
              className="underline"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
        {/* Logged Out */}
        {!context &&
          links.map((link) => (
            <Link key={link.name} href={link.url}>
              <a className="underline">{link.name}</a>
            </Link>
          ))}
      </nav>
    </header>
  )
}
