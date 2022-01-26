import FormCreate from 'components/FormCreate'
import Page from 'components/Page'
import * as h from 'lib/helpers'

export const getServerSideProps = h.withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? h.redirect('/') : h.props({ user: null })
})

export default function Auth(props: { user: UserCSR | null }) {
  return (
    <Page title="Create" context={props}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Create</h1>
        <div className="mt-4">
          <FormCreate />
        </div>
      </div>
    </Page>
  )
}
