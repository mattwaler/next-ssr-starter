import { GetServerSidePropsContext as SSPC } from 'next'
import connect from 'lib/database'
import { serialize } from 'lib/helpers/shorthands'
import User from 'lib/user/model'

async function fetchUser(context: SSPC): Promise<UserCSR | null> {
  try {
    // Bail if no session
    const { user } = context.req.session
    if (!user) return null

    // Fetch data if session available
    await connect()
    const userData: UserCSR | null = await User.findById(user.id, {
      password: 0,
    })
    return serialize(userData)
  } catch (error) {
    // Nuke session if this fails
    context.res.setHeader('cache-control', 'no-store, max-age=0')
    await context.req.session.destroy()
    return null
  }
}

export default fetchUser
