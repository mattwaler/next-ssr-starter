import bcrypt from 'bcrypt'
import connect from 'helpers/db'
import User from 'models/User'
import withSession from 'helpers/session'
import { isEmail } from 'validator'

export default withSession(async (req, res) => {

  // CREATE
  if (req.method == 'POST') {
    try {
      await connect()
      const hashedPassword = await bcrypt.hash( req.body.password, parseInt(process.env.SALT_ROUNDS) )
      await User.create({ ...req.body, password: hashedPassword })
      return res.status(200).json({ success: true, message: 'User created successfully.' })
    } catch (error) {
      console.error(error)
      return res.status(200).json({ success: false })
    }
  }

  // UPDATE
  if (req.method === 'PATCH') {
    try {
      const session = req.session.get('user')
      if (!session) return
      if (req.body.email) {
        const validEmail = isEmail(req.body.email)
        if (!validEmail) {
          return res.status(200).json({ success: false, message: 'Invalid email.' })
        }
      }
      await connect()
      await User.findByIdAndUpdate(session.id, req.body, { new: true })
      return res.status(200).json({ success: true, message: 'User updated successfully.' })
    } catch (error) {
      console.error(error)
      return res.status(200).json({ success: false, message: 'Something went wrong.' })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false, message: 'Invalid method.' })

})