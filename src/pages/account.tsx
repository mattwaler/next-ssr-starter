import Page from 'components/Page'
import { withSessionSsr, getUser, props, redirect } from 'lib/server'
import FormUpdate from 'components/FormUpdate'
import { User } from '@prisma/client'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : redirect('/')
})

export default function Account({ user }: { user: User }) {
  return (
    <Page title="Account" user={user}>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Account</h1>
        <p>This page is only accessible to logged-in users.</p>
        <div className="mt-8">
          <FormUpdate />
        </div>
      </div>
    </Page>
  )
}
