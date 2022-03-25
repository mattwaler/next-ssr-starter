import clsx from 'clsx'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Toaster } from 'react-hot-toast'
import { UserContext } from 'contexts/UserContext'
import { User } from '@prisma/client'

interface Props {
  children: React.ReactNode
  title: string
  user: User|null
}

export default function Page(props: Props) {
  const { children, title, user } = props
  const devMode = process.env.NODE_ENV === 'development'
  return (
    <>
      <Head>
        <title>{title} | Next SSR Starter</title>
      </Head>
      <UserContext.Provider value={user}>
        <div
          className={clsx(
            'flex min-h-screen flex-col text-gray-900 antialiased',
            devMode && 'debug-screens'
          )}
        >
          <Toaster />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  )
}
