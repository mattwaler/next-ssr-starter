import User from 'models/User'
import withSession from 'helpers/session'
import Layout from 'components/Layout'
import UpdateEmail from 'components/UpdateEmail'

export default function Account(props) {
  return (
    <Layout isLoggedIn={true}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>
          Welcome to the account page!
        </p>
        <UpdateEmail email={props.user.email} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async function (context: Context) {
  const session = context.req.session.get('user')
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
    }
  }

  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return {
    props: {
      user: data,
    },
  }
})
