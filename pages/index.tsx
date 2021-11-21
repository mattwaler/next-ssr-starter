import connect from 'helpers/db'
import Page from 'components/Page'
import User from 'models/User'
import { withSessionSsr } from 'helpers/session'

export const getServerSideProps = withSessionSsr(
  async function getServerProps(context) {
    const { user } = context.req.session
    if (!user) {
      return {
        props: {
          user: null
        }
      }
    }
    await connect()
    const userData = await User.findById(user.id)
    const userObj = JSON.parse(JSON.stringify(userData))
    return {
      props: {
        user: {
          email: userObj.email
        }
      }
    }
  }
)

export default function Home(props) {
  const email = props.user?.email
  return (
    <Page context={props}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {email ?? 'guest'}!
      </div>
    </Page>
  )
}

