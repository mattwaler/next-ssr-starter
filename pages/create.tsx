import FormCreate from 'components/FormCreate'
import Page from 'components/Page'
import { props, redirect, withSessionSsr } from 'lib/server'

export const getServerSideProps = withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? redirect('/') : props({})
})

export default function Auth() {
  return (
    <Page title="Create" user={null}>
      <div className="container py-8">
        <h1 className="col-span-2 text-3xl font-bold">Create</h1>
        <div className="mt-4">
          <FormCreate />
        </div>
      </div>
    </Page>
  )
}
