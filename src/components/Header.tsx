import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { useQuery, useQueryClient } from 'react-query'
import { getUser } from 'lib/helpers'
import axios from 'axios'

export default function Header() {
  const router = useRouter()
  const client = useQueryClient()
  const query = useQuery('user', getUser)
  const user = query?.data?.user

  function isActive(text) {
    const slug = `/${text.toLowerCase()}`
    return slug === router.pathname
  }

  async function logout() {
    const { data } = await axios.delete('/api/auth')
    console.log(data.success)
    if (data.success) {
      client.invalidateQueries('user')
      router.push('/')
    }
  }

  const links = user
    ? [
        { text: 'Account', action: () => router.push('/account') },
        { text: 'Logout', action: () => logout() },
      ]
    : [
        { text: 'Login', action: () => router.push('/login') },
        { text: 'Create', action: () => router.push('/create') },
      ]

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a
            className={clsx(
              'flex items-center gap-2',
              isActive('') && 'text-yellow-400'
            )}
          >
            <LightningBoltIcon className="w-6 h-6" />
            <span className="font-bold">Next SSR Starter</span>
          </a>
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <button
              key={link.text}
              onClick={link.action}
              className={clsx('font-medium', isActive(link.text) && 'text-yellow-400')}
            >
              {link.text}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
