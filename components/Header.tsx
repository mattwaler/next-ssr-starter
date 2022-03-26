import { LightningBoltIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import useUserContext from 'contexts/UserContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const user = useUserContext()

  const isActive = (path: string) => path === router.pathname

  const NavLink = ({ text = 'Text', link = '/' }) => (
    <Link href={link}>
      <a className={clsx('font-medium', isActive(link) && 'text-yellow-400')}>
        {text}
      </a>
    </Link>
  )

  const links = user
    ? [
        { text: 'Account', link: '/account' },
        { text: 'Logout', link: '/api/auth' },
      ]
    : [
        { text: 'Login', link: '/login' },
        { text: 'Create', link: '/create' },
      ]

  return (
    <header className="bg-gray-900 py-4 text-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a
            className={clsx(
              'flex items-center gap-2',
              isActive('/') && 'text-yellow-400'
            )}
          >
            <LightningBoltIcon className="h-6 w-6" />
            <span className="font-bold">Next SSR Starter</span>
          </a>
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <NavLink key={link.text} {...link} />
          ))}
        </nav>
      </div>
    </header>
  )
}
