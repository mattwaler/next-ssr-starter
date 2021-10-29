import bcrypt from 'bcrypt'
import connect from 'helpers/db'
import User from 'models/User'
import withSession from 'helpers/session'

export default withSession(async (req, res) => {

  // LOGIN
  if (req.method == 'POST') {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({ success: false, message: 'Please provide an email and password.' })
    }
    const { email, password } = await req.body
    try {
      await connect()
      const user = await User.findOne({ email })
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        req.session.set('user', { id: user._id })
        await req.session.save()
        return res.status(200).json({
          success: true,
          message: 'Logged in!',
        })
      }
      return res.status(200).json({
        success: false,
        message: 'There was an issue logging in.',
      })
    } catch (error) {
      console.error(error)
      return res.status(200).json({
        success: false,
        message: 'There was an issue logging in.',
      })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false })

})
