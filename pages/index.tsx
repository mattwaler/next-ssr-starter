import Page from 'components/Page'
import { getUser, props, withSessionSsr } from 'lib/helpers'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  return user ? props({ user }) : props({ user: null })
})

export default function Home(props: { user: UserCSR | null }) {
  const email = props.user?.email
  return (
    <Page title="Home" context={props}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {email ?? 'guest'}!
      </div>
    </Page>
  )
}
