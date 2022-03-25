import Page from 'components/Page'
import { withSessionSsr, getUser, props } from 'lib/server'
import { User } from '@prisma/client'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : props({ user: null })
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
