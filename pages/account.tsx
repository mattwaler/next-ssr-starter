import Page from 'components/Page'
import * as h from 'lib/helpers'
import FormUpdate from 'components/FormUpdate'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user }) : h.redirect('/')
})

export default function Account(props: { user: UserCSR | null }) {
  return (
    <Page title="Account" context={props}>
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
