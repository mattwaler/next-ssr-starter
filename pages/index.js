import connect from 'helpers/db'
import Page from 'components/Page'
import User from 'models/User'
import withSession from 'helpers/session'

export default function Home(props) {
  return (
    <Page context={props}>
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home!!!</h1>
        Hello {props?.user ? 'logged in user' : 'guest'}!
      </div>
    </Page>
  )
}

export const getServerSideProps = withSession(async (context) => {
  const session = context.req.session.get('user')
  if (session === undefined) {
    return {
      props: {
        data: null
      }
    }
  }
  await connect()
  const user = await User.findById(session.id)
  const data = JSON.parse(JSON.stringify(user))
  return {
    props: {
      data
    }
  }
})
