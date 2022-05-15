import Page from 'components/Page'
import UserDelete from 'lib/user/views/UserDelete'
import UserUpdate from 'lib/user/views/UserUpdate'
import { withSessionSsr } from 'lib/session'
import { props, redirect } from 'lib/helpers/shorthands'
import fetchUser from 'lib/user/queries/fetchUser'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await fetchUser(context)
  return user ? props({ user }) : redirect('/')
})

interface Props {
  user: UserCSR
}

export default function Account(props: Props) {
  const { user } = props
  return (
    <Page title="Account" context={{ user }}>
      <UserUpdate />
      <UserDelete />
    </Page>
  )
}
