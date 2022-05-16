import Link from 'next/link'
import Menu from 'lib/user/views/Menu'
import { usePageContext } from 'lib/page'
import { GlobeAltIcon, LoginIcon } from '@heroicons/react/outline'

interface NavItemProps {
  link: string
  text: string
  icon: React.ReactNode
}

function NavItem(props: NavItemProps) {
  return (
    <Link href={props.link}>
      <a className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 px-4 text-sm text-gray-900">
        <span className="-ml-1 h-5 w-5 text-gray-900/90">{props.icon}</span>{' '}
        <span>{props.text}</span>
      </a>
    </Link>
  )
}

export default function Header() {
  const { user } = usePageContext()

  return (
    <header className="border-b bg-white">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 font-black sm:text-lg">
            <GlobeAltIcon className="w-6 h-6" />
            Next SSR Starter
          </a>
        </Link>
        {user && <Menu />}
        {!user && <NavItem text="Login" link="/login" icon={<LoginIcon />} />}
      </div>
    </header>
  )
}
