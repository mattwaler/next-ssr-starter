import User from 'models/User'
import withSession from 'helpers/session'
import Layout from 'components/Layout'
import redirect from 'helpers/redirect'

export default function Account() {
  return (
    <Layout isLoggedIn={true}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>
          Welcome to the account page!
        </p>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async function (context: Context) {
  const session = context.req.session.get('user')

  if (session === undefined) {
    return redirect('/')
  }
  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return {
    props: {
      user: data,
    },
  }
})
