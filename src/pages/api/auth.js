import bcrypt from 'bcrypt'
import User from 'models/User'
import { connect, withSessionRoute } from 'lib/helpers'

export default withSessionRoute(async function route(req, res) {
  // LOGIN
  if (req.method == 'POST') {
    // Bail if incorrect post body
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        success: false,
        message: 'Please provide an email and password.',
      })
    }
    try {
      const { email, password } = req.body
      await connect()
      const user = await User.findOne({ email })
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        req.session.user = { id: user._id }
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

  // LOGOUT
  if (req.method === 'GET') {
    try {
      res.setHeader('cache-control', 'no-store, max-age=0')
      await req.session.destroy()
      res.status(200).redirect('/')
      return
    } catch (error) {
      return res.status(200).json({ success: false })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false })
})