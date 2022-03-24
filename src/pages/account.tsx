import Page from 'components/Page'
import * as h from 'lib/helpers'
import FormUpdate from 'components/FormUpdate'
import { UserCSR } from 'models/User'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user }) : h.redirect('/')
})

export default function Account({ user }: { user: UserCSR }) {
  return (
    <Page title="Account" user={user}>
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
