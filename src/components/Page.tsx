import clsx from 'clsx'
import Head from 'next/head'
import Header from 'lib/navigation/views/Header'
import { Toaster } from 'react-hot-toast'
import { createContext, useContext } from 'react'

export interface PageContextIF {
  user: null | UserCSR
}

const defaultPageContext: PageContextIF = {
  user: null
}

export const PageContext = createContext(defaultPageContext)
export const usePageContext = () => useContext(PageContext)

interface PageContainerProps {
  heading: string
  children?: React.ReactNode
}

export function PageContainer(props: PageContainerProps) {
  return (
    <div className="container grid grid-cols-1 gap-8 py-8">
      <h1 className="h1">{props.heading}</h1>
      {props.children}
    </div>
  )
}

interface PageProps {
  children: React.ReactNode
  title: string
  context?: PageContextIF
}

export default function Page(props: PageProps) {
  const { children, title, context } = props
  const devMode = process.env.NODE_ENV === 'development'
  return (
    <PageContext.Provider value={context ?? defaultPageContext}>
      <Head>
        <title>{title} | Tennis Toolkit</title>
      </Head>
      <div
        className={clsx(
          'flex min-h-screen flex-col',
          devMode && 'debug-screens'
        )}
      >
        <Toaster />
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </PageContext.Provider>
  )
}
