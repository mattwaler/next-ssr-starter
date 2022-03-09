import Page from 'components/Page'
import FormUpdate from 'components/FormUpdate'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? h.props({}) : h.redirect('/')
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
