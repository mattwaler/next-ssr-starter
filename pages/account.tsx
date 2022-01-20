import Page from 'components/Page'
import { getUser, props, redirect, withSessionSsr } from 'lib/helpers'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : redirect('/')
})

export default function Account(props: { user: UserCSR | null }) {
  return (
    <Page title="Account" context={props}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>This page is only accessible to logged-in users.</p>
      </div>
    </Page>
  )
}
