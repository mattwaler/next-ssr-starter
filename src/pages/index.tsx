import Page from 'components/Page'
import * as h from 'lib/helpers'
import { UserCSR } from 'models/User'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user }) : h.props({ user: null })
})

export default function Home({ user }: { user: UserCSR }) {
  return (
    <Page title="Home" user={user}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello { user?.name ?? user?.email ?? 'guest'}!
      </div>
    </Page>
  )
}
