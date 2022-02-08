import clsx from 'clsx'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Toaster } from 'react-hot-toast'
import { createContext, useContext } from 'react'

const UserContext = createContext(null)
export const useUser = () => useContext(UserContext)

export default function Page(props) {
  const { title, children, user } = props
  const devMode = process.env.NODE_ENV === 'development'

  return (
    <UserContext.Provider value={user}>
      <Head>
        <title>{title} | Next SSR Starter</title>
      </Head>
      <div
        className={clsx(
          'antialiased text-gray-900 min-h-screen flex flex-col',
          devMode && 'debug-screens'
        )}
      >
        <Toaster />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </UserContext.Provider>
  )
}
