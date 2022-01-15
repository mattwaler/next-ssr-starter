import { useState } from 'react'
import FormCreate from 'components/FormCreate'
import FormLogin from 'components/FormLogin'
import Page from 'components/Page'
import { props, withSessionSsr } from 'helpers/all'

export const getServerSideProps = withSessionSsr(async (context) => {
  const { user } = context.req.session
  if (user) return props({ redirect: { destination: '/', permanent: false } })
  return props({ user: null })
})

export default function Auth(props) {
  enum States {
    Initial,
    Login,
    Create,
  }
  const [state, setState] = useState<States>(States.Initial)

  return (
    <Page title="Authenticate" context={props}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Authenticate</h1>
        {state == States.Initial && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setState(States.Login)}
              className="underline"
            >
              Login
            </button>
            <p>Or</p>
            <button
              onClick={() => setState(States.Create)}
              className="underline"
            >
              Create Account
            </button>
          </div>
        )}
        {state != States.Initial && (
          <div className="flex items-center gap-2">
            <p>Click the wrong button?</p>
            <button
              onClick={() => setState(States.Initial)}
              className="underline"
            >
              Start Over
            </button>
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 gap-24 lg:grid-cols-2">
          {state === States.Login && <FormLogin />}
          {state == States.Create && <FormCreate />}
        </div>
      </div>
    </Page>
  )
}
