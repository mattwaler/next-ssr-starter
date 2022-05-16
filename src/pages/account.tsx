import Page from 'lib/page'
import Delete from 'lib/user/views/Delete'
import Update from 'lib/user/views/Update'
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
      <Update />
      <Delete />
    </Page>
  )
}
