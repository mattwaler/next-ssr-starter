import { useState } from 'react'
import FormCreate from 'components/FormCreate'
import FormLogin from 'components/FormLogin'
import Page from 'components/Page'
import { props, redirect, withSessionSsr } from 'lib/helpers'

export const getServerSideProps = withSessionSsr(async (context) => {
  const { user } = context.req.session
  return user ? redirect('/') : props({ user: null })
})

export default function Auth(props: { user: UserCSR | null }) {
  type State = 'initial' | 'login' | 'create'
  const [state, setState] = useState<State>('initial')
  const is = (currentState: State) => currentState === state

  return (
    <Page title="Authenticate" context={props}>
      <div className="container py-8">
        <h1 className="col-span-2 font-bold text-3xl">Authenticate</h1>
        {is('initial') && (
          <div className="flex items-center gap-2">
            <button onClick={() => setState('login')} className="underline">
              Login
            </button>
            <p>Or</p>
            <button onClick={() => setState('create')} className="underline">
              Create Account
            </button>
          </div>
        )}
        {!is('initial') && (
          <div className="flex items-center gap-2">
            <p>Click the wrong button?</p>
            <button onClick={() => setState('initial')} className="underline">
              Start Over
            </button>
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 gap-24 lg:grid-cols-2">
          {is('login') && <FormLogin />}
          {is('create') && <FormCreate />}
        </div>
      </div>
    </Page>
  )
}
