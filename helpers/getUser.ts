import connect from 'helpers/db'
import User, { UserType } from 'models/User'
import { GetServerSidePropsContext } from 'next'

export default async function getUser(context: GetServerSidePropsContext) {
  const { user } = context.req.session
  if (!user) {
    return null
  }
  await connect()
  const userData: UserType = await User.findById(user.id)
  const userObj: UserType = JSON.parse(JSON.stringify(userData))
  return {
    email: userObj.email,
  }
}
