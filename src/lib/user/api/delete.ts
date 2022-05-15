import User from 'lib/user/model'
import connect from 'lib/database'
import { ApiRouteMethod } from 'lib/api'

const deleteUser: ApiRouteMethod = async ({ req, res, user }) => {
  try {
    // Check for Session
    if (!user) throw new Error('No session found.')

    // Connect to DB and Find User
    await connect()
    await User.findByIdAndDelete(user?.id)

    // Destroy Session
    res.setHeader('cache-control', 'no-store, max-age=0')
    await req.session.destroy()

    // Send Success
    return res
      .status(200)
      .json({ success: true, message: 'User deleted successfully.' })
  } catch (error) {
    // Send Error
    return res.status(200).json({ success: true, message: error.message })
  }
}

export default deleteUser
