import connect from 'helpers/db'
import Page from 'components/Page'
import User from 'models/User'
import { withSessionSsr } from 'helpers/session'

export default function Home(props) {
  return (
    <Page context={props}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {props.user ? 'logged in user' : 'guest'}!
      </div>
    </Page>
  )
}

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
      user: userObj
    }
  }
}

export const getServerSideProps = withSessionSsr(getServerProps)
