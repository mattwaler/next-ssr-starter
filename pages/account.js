import User from 'models/User'
import withSession from 'helpers/session'
import connect from 'helpers/db'
import Page from 'components/Page'

export default function Account(props) {
  return (
    <Page context={props.user}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Account</h1>
        <p>
          Welcome to the account page!
        </p>
      </div>
    </Page>
  )
}

export const getServerSideProps = withSession(async function (context) {
  const session = context.req.session.get('user')
  if (!session) {
    return { redirect: { destination: '/', permanent: false },
    }
  }
  await connect()
  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return {
    props: {
      user: data,
    },
  }
})
