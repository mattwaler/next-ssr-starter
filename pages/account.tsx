import Page from 'components/Page'
import * as h from 'lib/helpers'
import FormUpdate from 'components/FormUpdate'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const user = await h.getUser(context)
  return user ? h.props({ user: { ...user } }) : h.redirect('/')
})

interface Props {
  user: UserCSR
}

export default function Account(props: Props) {
  return (
    <Page title="Account" user={props.user}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>This page is only accessible to logged-in users.</p>
        <div className="mt-8">
          <FormUpdate user={props.user} />
        </div>
      </div>
    </Page>
  )
}
