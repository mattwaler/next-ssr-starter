import bcrypt from 'bcrypt'
import User from 'models/User'
import isEmail from 'validator/lib/isEmail'
import { connect, withSessionRoute } from 'lib/server'

export default withSessionRoute(async function route(req, res) {
  // Create User
  async function createUser() {
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

  // Update User
  async function updateUser() {
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

  // Handle Request
  switch (req.method) {
    case 'POST':
      return createUser()
    case 'PATCH':
      return updateUser()
    default:
      return res.status(200).json({ success: false })
  }
})
