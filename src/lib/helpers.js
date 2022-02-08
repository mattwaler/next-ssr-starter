import mongoose from 'mongoose'
import User from 'models/User'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

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

export function createFormObject(form) {
  const data = new FormData(form)
  return Object.fromEntries(data.entries())
}

export async function getUser(context) {
  // Bail if no session
  const { user } = context.req.session
  if (!user) return null

  // Fetch data if session available
  await connect()
  const userData = await User.findById(user.id)
  const obj = JSON.parse(JSON.stringify(userData))
  return {
    email: obj.email,
    name: obj?.name ?? null,
  }
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

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, withSessionOptions)
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, withSessionOptions)
}
