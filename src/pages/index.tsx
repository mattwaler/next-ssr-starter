import Page from 'components/Page'
import { withSessionSsr, getUser, props } from 'lib/server'
import { UserCSR } from 'models/User'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : props({ user: null })
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
