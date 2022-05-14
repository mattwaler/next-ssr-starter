import User from 'lib/user/model'
import connect from 'lib/database'
import { ApiRouteMethod } from 'lib/api'

const deleteUser: ApiRouteMethod = async ({ req, res, user }) => {
  await connect()
  await User.findByIdAndDelete(user?.id)
  res.setHeader('cache-control', 'no-store, max-age=0')
  await req.session.destroy()
  return res
    .status(200)
    .json({ success: true, message: 'User deleted successfully.' })
}

export default deleteUser
