import { NextRouter } from 'next/router'

export default function refetchServerProps(router: NextRouter) {
  return router.replace(router.pathname, undefined, { scroll: false })
}
