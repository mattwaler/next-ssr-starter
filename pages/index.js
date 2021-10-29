import User from 'models/User'
import withSession from 'helpers/session'
import connect from 'helpers/db'
import Page from 'components/Page'

export default function Home(props) {
  return (
    <Page context={props.user}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {props.user !== null ? 'logged in user' : 'guest'}!
      </div>
    </Page>
  )
}

export const getServerSideProps = withSession(async (context) => {
  const session = context.req.session.get("user");
  if (session === undefined) {
    return { props: { user: null } }
  }
  await connect()
  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return { props: { user: data } }
})
