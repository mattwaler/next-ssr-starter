import Header from 'components/Header'
import Footer from 'components/Footer'
import { Toaster } from 'react-hot-toast'
import { createContext, useContext } from 'react'
import Head from 'next/head'

interface PageContextType {
  user: UserCSR
}

interface Props {
  context: PageContextType
  children: React.ReactNode
  title: string
}

const PageContext = createContext<PageContextType | null>(null)
export const usePageContext = () => useContext(PageContext)

export default function Page(props: Props) {
  const devMode = process.env.NODE_ENV === 'development'
  return (
    <PageContext.Provider value={props.context}>
      <Head>
        <title>{props.title} | Next SSR Starter</title>
      </Head>
      <div
        className={`antialiased text-gray-900 min-h-screen flex flex-col ${
          devMode && 'debug-screens'
        }`}
      >
        <Toaster />
        <Header />
        <main className="flex-1">{props.children}</main>
        <Footer />
      </div>
    </PageContext.Provider>
  )
}
