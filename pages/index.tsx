import Page from 'components/Page'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user: { ...user } }) : h.props({ user: null })
})

interface Props {
  user: UserCSR | null
}

export default function Home(props: Props) {
  const { user } = props
  return (
    <Page title="Home" user={user}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {user?.name ?? user?.email ?? 'guest'}!
      </div>
    </Page>
  )
}
