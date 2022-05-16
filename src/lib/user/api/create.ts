import bcrypt from 'bcrypt'
import User from 'lib/user/model'
import connect from 'lib/database'
import * as yup from 'yup'

const createUser: ApiRoute = async ({ req, res }) => {
  try {
    // Validate Request
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      password: yup.string().required(),
    })
    const isValid = await schema.isValid(req.body)
    if (!isValid) throw new Error('Validation error.')

    // Connect to DB, Hash PW, Create User
    await connect()
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    )
    const user: UserSSR = await User.create({
      ...req.body,
      password: hashedPassword,
    })

    // Create Session
    req.session.user = { id: user._id.toString() }
    await req.session.save()

    // Send Success
    return res.status(200).json({
      success: true,
      message: 'User created successfully.',
    })
  } catch(error) {
    // Send Error
    return res.status(200).json({
      success: false,
      message: error.message,
    })
  }
}

export default createUser
