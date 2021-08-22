import Nav from 'components/Nav'
import { Toaster } from 'react-hot-toast'

export default function Layout({ isLoggedIn = false, children }) {
  const devMode =  process.env.NODE_ENV === 'development'
  return (
    <div className={devMode && 'debug-screens'}>
      <Toaster />
      <Nav isLoggedIn={isLoggedIn} />
      {children}
    </div>
  )
}
