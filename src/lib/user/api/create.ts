import bcrypt from 'bcrypt'
import User from 'lib/user/model'
import connect from 'lib/database'
import * as yup from 'yup'
import { ApiRouteMethod } from 'lib/api'

const createUser: ApiRouteMethod = async ({req, res}) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
  })
  const isValid = await schema.isValid(req.body)
  if (!isValid) throw new Error('Validation error.')
  await connect()
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS)
  )
  const user: UserSSR = await User.create({
    ...req.body,
    password: hashedPassword,
  })
  req.session.user = { id: user._id.toString() }
  await req.session.save()
  return res.status(200).json({
    success: true,
    message: 'User created successfully.',
  })
}

export default createUser
