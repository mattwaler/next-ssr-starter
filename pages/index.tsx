import User from 'models/User'
import withSession from 'helpers/session'
import Layout from 'components/Layout'
import connect from 'helpers/db'

export default function Home(props) {
  return (
    <Layout isLoggedIn={props.user !== null}>
      <p className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {props.user !== null ? 'logged in user' : 'guest'}!
      </p>
    </Layout>
  )
}

export const getServerSideProps = withSession(async (context: Context) => {
  const session = context.req.session.get("user");
  if (session === undefined) {
    return { props: { user: null } }
  }
  await connect()
  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return { props: { user: data } }
})
