import FormCreate from 'components/FormCreate'
import FormLogin from 'components/FormLogin'
import Page from 'components/Page'
import { withSessionSsr } from 'helpers/session'

export const getServerSideProps = withSessionSsr(
  async function getServerProps(context) {
    const { user } = context.req.session
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    return {
      props: {
        user: null,
      }
    }
  }
)

export default function Auth(props) {
  return (
    <Page context={props}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Authenticate</h1>
        <div className="mt-8 grid grid-cols-1 gap-24 lg:grid-cols-2">
          <FormLogin />
          <FormCreate />
        </div>
      </div>
    </Page>
  )
}
