import { PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma


export async function getUser(context) {
  // Bail if no session
  const { user } = context.req.session
  if (!user) return null

  // Fetch data if session available
  const userServer = await prisma.user.findUnique({ where: { id: user.id } })
  const userClient = {
    email: userServer?.email,
    ...(userServer?.name && { name: userServer?.name }),
  }
  return userClient
}

export function props(obj) {
  return {
    props: {
      ...obj,
    },
  }
}

export function redirect(destination = '/', permanent = false) {
  return {
    redirect: {
      destination,
      permanent,
    },
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number | undefined
    }
  }
}

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
