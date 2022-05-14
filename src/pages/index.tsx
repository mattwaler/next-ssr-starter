import Page, { PageContainer } from 'components/Page'
import { props } from 'lib/helpers/shorthands'
import { withSessionSsr } from 'lib/session'
import fetchUser from 'lib/user/queries/fetchUser'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await fetchUser(context)
  return user ? props({ user }) : props({})
})

interface Props {
  user: UserCSR
}

export default function Home(props: Props) {
  const { user } = props

  return (
    <Page title="Home" context={{ user }}>
      <PageContainer heading="Home" />
    </Page>
  )
}
