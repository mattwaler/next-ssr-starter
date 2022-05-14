import bcrypt from 'bcrypt'
import * as yup from 'yup'
import User from 'lib/user/model'
import connect from 'lib/database'
import { ApiRouteMethod } from 'lib/api'

const login: ApiRouteMethod = async ({ req, res }) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  const isValid = await schema.isValid(req.body)
  if (!isValid) throw new Error('Validation error.')
  const { email, password } = req.body
  await connect()
  const user: UserSSR | null = await User.findOne({ email })
  if (!user) throw new Error('No user found.')
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Incorrect password.')
  req.session.user = { id: user._id.toString() }
  await req.session.save()
  return res.status(200).json({
    success: true,
    message: 'Logged in!',
  })
}

export default login
