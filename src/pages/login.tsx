import FormLogin from 'components/FormLogin'
import Page from 'components/Page'
import * as s from 'lib/server'

export const getServerSideProps = s.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? s.redirect('/') : s.props({})
})

export default function Auth() {
  return (
    <Page title="Login">
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Login</h1>
        <div className="mt-4">
          <FormLogin />
        </div>
      </div>
    </Page>
  )
}
