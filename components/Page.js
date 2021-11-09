import Nav from 'components/Nav'
import { Toaster } from 'react-hot-toast'
import { createContext, useContext } from 'react'

const PageContext = createContext(null)
export const usePageContext = () => useContext(PageContext)

export default function Page(props) {
  const devMode =  process.env.NODE_ENV === 'development'
  return (
    <PageContext.Provider value={props.context}>
      <div className={`flex flex-col ${devMode && 'debug-screens'}`}>
        <Toaster />
        <Nav />
        <main className="flex-1">
          {props.children}
        </main>
      </div>
    </PageContext.Provider>
  )
}
