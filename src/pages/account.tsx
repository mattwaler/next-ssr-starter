import Page from 'components/Page'
import { withSessionSsr, getUser, props, redirect } from 'lib/server'
import FormUpdate from 'components/FormUpdate'
import { UserCSR } from 'models/User'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : redirect('/')
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
