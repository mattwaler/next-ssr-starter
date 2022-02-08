import Page from 'components/Page'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user }) : h.props({})
})

export default function Home({ user }) {
  return (
    <Page title="Home" user={user ?? null}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {user?.name ?? user?.email ?? 'guest'}!
      </div>
    </Page>
  )
}
