import Link from 'next/link'

export default function Nav({ isLoggedIn = false }) {
  const links = isLoggedIn
    ? [
        { name: 'Account', url: '/account' },
        { name: 'Log Out', url: '/api/logout' },
      ]
    : [
        { name: 'Create Account', url: '/create-account' },
        { name: 'Login', url: '/login' },
      ]

  return (
    <header className="container flex items-center justify-between py-8">
      <Link href="/">
        <a className="underline">Home</a>
      </Link>
      <nav className="space-x-4">
        {links.map((link) => (
          <Link key={link.name} href={link.url}>
            <a className="underline">{link.name}</a>
          </Link>
        ))}
      </nav>
    </header>
  )
}
