import { useState } from 'react'
import Card from 'components/Card'
import UserCreate from 'lib/user/views/UserCreate'
import UserLogin from 'lib/user/views/UserLogin'

export default function Login() {
  type State = 'LOGIN' | 'CREATE'
  const [state, setState] = useState<State>('LOGIN')
  const isLogin = state === 'LOGIN'

  function toggleState() {
    return isLogin ? setState('CREATE') : setState('LOGIN')
  }

  return (
    <>
      <Card
        heading={isLogin ? 'Sign in to your account' : 'Create an account'}
        subheading="Fill in the below fields to get started."
      >
        {isLogin && <UserLogin />}
        {!isLogin && <UserCreate />}
      </Card>
      <div className="text-center">
        <h3 className="mt-8">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </h3>
        <button className="text-blue-500 hover:underline" onClick={toggleState}>
          {isLogin ? 'Create an account' : 'Sign in to your account'}
        </button>
      </div>
    </>
  )
}
