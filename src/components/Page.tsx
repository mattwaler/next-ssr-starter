import clsx from 'clsx'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Toaster } from 'react-hot-toast'

interface Props {
  children: React.ReactNode
  title: string
}

export default function Page(props: Props) {
  const { children, title } = props
  const devMode = process.env.NODE_ENV === 'development'
  return (
    <>
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
    </>
  )
}
