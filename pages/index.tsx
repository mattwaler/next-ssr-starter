import { User } from '@prisma/client'
import Page from 'components/Page'
import { getUser, props, withSessionSsr } from 'lib/server'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return props({ user })
})

export default function Home({ user }: { user: User }) {
  return (
    <Page title="Home" user={user}>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Home</h1>
        Hello {user?.name ?? user?.email ?? 'guest'}!
      </div>
    </Page>
  )
}
