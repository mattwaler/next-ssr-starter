import Page from 'lib/page'
import { props } from 'lib/helpers/shorthands'
import { withSessionSsr } from 'lib/session'
import fetchUser from 'lib/user/queries/fetchUser'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await fetchUser(context)
  return props({ user })
})

interface Props {
  user: UserCSR | null
}

export default function Home(props: Props) {
  const { user } = props

  return (
    <Page title="Home" context={{ user }}>
      <p>Welcome to the starter project, {user?.name ?? 'guest' }!</p>
    </Page>
  )
}
