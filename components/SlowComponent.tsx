import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function SlowComponent() {
  type State = 'loading' | 'loaded'
  const [state, setState] = useState<State>('loading')
  const is = (currentState: State) => currentState === state

  useEffect(() => {
    setTimeout(() => setState('loaded'), 3000)
  }, [])

  return (
    <div
      className={clsx(
        'mt-4 p-8 rounded',
        is('loading') ? 'bg-yellow-300 animate-pulse' : 'bg-green-300'
      )}
    >
      {is('loading') ? 'Loading...' : 'Loaded!'}
    </div>
  )
}
