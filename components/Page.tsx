import clsx from 'clsx'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Toaster } from 'react-hot-toast'

interface Props {
  user: UserCSR | null
  children: React.ReactNode
  title: string
}

export default function Page(props: Props) {
  const devMode = process.env.NODE_ENV === 'development'
  return (
    <>
      <Head>
        <title>{props.title} | Next SSR Starter</title>
      </Head>
      <div
        className={clsx(
          'antialiased text-gray-900 min-h-screen flex flex-col',
          devMode && 'debug-screens'
        )}
      >
        <Toaster />
        <Header user={props.user} />
        <main className="flex-1">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}
