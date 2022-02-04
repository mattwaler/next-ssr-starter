import FormCreate from 'components/FormCreate'
import Page from 'components/Page'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? h.redirect('/') : h.props({ user: null })
})

interface Props {
  user: UserCSR
}

export default function Auth(props: Props) {
  return (
    <Page title="Create" user={props.user}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Create</h1>
        <div className="mt-4">
          <FormCreate />
        </div>
      </div>
    </Page>
  )
}
