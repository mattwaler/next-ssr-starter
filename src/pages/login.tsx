import Page from 'lib/page'
import Auth from 'lib/user/views/Auth'
import { props, redirect } from 'lib/helpers/shorthands'
import { withSessionSsr } from 'lib/session'

export const getServerSideProps = withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? redirect('/') : props({})
})

export default function Login() {
  return (
    <Page title="Login">
      <Auth />
    </Page>
  )
}
