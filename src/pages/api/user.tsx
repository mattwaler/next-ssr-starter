import bcrypt from 'bcrypt'
import User, { UserCSR, UserSSR } from 'models/User'
import isEmail from 'validator/lib/isEmail'
import { connect, withSessionRoute, getUser } from 'lib/helpers'

export default withSessionRoute(async function route(req, res) {
  // Check
  if (req.method == 'GET') {
    const { user } = req.session
    if (!user) {
      return res.status(200).json({ success: false })
    }
    try {
      await connect()
      const userServer: UserSSR = await User.findById(user.id)
      const userClient: UserCSR = {
        email: userServer.email,
        ...(userServer?.name && { name: userServer?.name }),
      }
      return res.status(200).json({ success: true, user: userClient })
    } catch (err) {
      console.error(err)
      return res.status(200).json({ success: false })
    }
  }

  // CREATE
  if (req.method == 'POST') {
    try {
      await connect()
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS)
      )
      await User.create({ ...req.body, password: hashedPassword })
      return res
        .status(200)
        .json({ success: true, message: 'User created successfully.' })
    } catch (error) {
      console.error(error)
      return res.status(200).json({ success: false })
    }
  }

  // UPDATE
  if (req.method === 'PATCH') {
    try {
      const user = req.session.user
      if (!user) return
      if (req.body.email) {
        const validEmail = isEmail(req.body.email)
        if (!validEmail) {
          return res
            .status(200)
            .json({ success: false, message: 'Invalid email.' })
        }
      }
      await connect()
      await User.findByIdAndUpdate(user.id, req.body, { new: true })
      return res
        .status(200)
        .json({ success: true, message: 'User updated successfully.' })
    } catch (error) {
      console.error(error)
      return res
        .status(200)
        .json({ success: false, message: 'Something went wrong.' })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false, message: 'Invalid method.' })
})
