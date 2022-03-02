import mongoose from 'mongoose'
import User, { UserCSR, UserSSR } from 'models/User'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next"

export async function connect() {
  // Bail if already connected
  if (mongoose.connections[0].readyState) return

  // Connect if not connected
  try {
    await mongoose.connect(process.env.DATABASE)
    console.log('Connected to database.')
  } catch (error) {
    console.log('DB error', error)
  }
}

export function createFormObject(form: HTMLFormElement) {
  const data = new FormData(form)
  return Object.fromEntries(data.entries())
}

export async function getUser(context) {
  // Bail if no session
  const { user } = context.req.session
  if (!user) return null

  // Fetch data if session available
  await connect()
  const userServer: UserSSR = await User.findById(user.id)
  const userClient: UserCSR = {
    email: userServer.email,
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

const withSessionOptions = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, withSessionOptions)
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, withSessionOptions)
}
