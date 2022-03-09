import Page from 'components/Page'
import FormUpdate from 'components/FormUpdate'
import * as s from 'lib/server'

export const getServerSideProps = s.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? s.props({}) : s.redirect('/')
})

export default function Account() {
  return (
    <Page title="Account">
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>This page is only accessible to logged-in users.</p>
        <div className="mt-8">
          <FormUpdate />
        </div>
      </div>
    </Page>
  )
}
