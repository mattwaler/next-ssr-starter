import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next'

const withSessionOptions = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, withSessionOptions)
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, withSessionOptions)
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string
    }
  }
}
