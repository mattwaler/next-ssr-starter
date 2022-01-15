import Page from 'components/Page'
import { getUser, props, withSessionSsr } from 'helpers/all'

export const getServerSideProps = withSessionSsr(async (context) => {
  const user = await getUser(context)
  if (!user) return props({ user: null })
  return props({ user })
})

export default function Home(props) {
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
