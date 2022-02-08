import FormLogin from 'components/FormLogin'
import Page from 'components/Page'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? h.redirect('/') : h.props({})
})

export default function Auth() {
  return (
    <Page title="Login" user={null}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Login</h1>
        <div className="mt-4">
          <FormLogin />
        </div>
      </div>
    </Page>
  )
}