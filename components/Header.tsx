import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePageContext } from 'components/Page'
import { LightningBoltIcon } from '@heroicons/react/solid'

export default function Nav() {
  const router = useRouter()
  const { user } = usePageContext()

  const isActive = (path)  => path === router.pathname

  const NavLink = ({ text = 'Text', link = '/' }) => (
    <Link href={link}>
      <a className={clsx('font-medium', isActive(link) && 'text-yellow-400')}>{text}</a>
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
    <header className="bg-gray-900 text-white py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className={clsx('flex items-center gap-2', isActive('/') && 'text-yellow-400')}>
            <LightningBoltIcon className="w-6 h-6" />
            <span className="font-bold">Next SSR Starter</span>
          </a>
        </Link>
        <nav className="flex items-center gap-4">
          {links.map(link => <NavLink key={link.text} {...link} />)}
        </nav>
      </div>
    </header>
  )
}
