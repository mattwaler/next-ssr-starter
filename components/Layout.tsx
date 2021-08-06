import Nav from 'components/Nav'

export default function Layout({ isLoggedIn = false, children }) {
  const devMode =  process.env.NODE_ENV === 'development'
  return (
    <div className={devMode && 'debug-screens'}>
      <Nav isLoggedIn={isLoggedIn} />
      {children}
    </div>
  )
}
