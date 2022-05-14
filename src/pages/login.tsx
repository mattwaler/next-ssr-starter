import Page, { PageContainer } from 'components/Page'
import LoginView from 'lib/user/views/Login'
import { props, redirect } from 'lib/helpers/shorthands'
import { withSessionSsr } from 'lib/session'

export const getServerSideProps = withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? redirect('/') : props({})
})

export default function Login() {
  return (
    <Page title="Login">
      <PageContainer heading="Login">
        <LoginView />
      </PageContainer>
    </Page>
  )
}
