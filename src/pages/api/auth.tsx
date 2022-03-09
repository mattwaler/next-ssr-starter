import bcrypt from 'bcrypt'
import User, { UserCSR, UserSSR } from 'models/User'
import { connect, withSessionRoute } from 'lib/server'

export default withSessionRoute(async function route(req, res) {
  // Login
  async function login() {
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

  // Logout
  async function logout() {
    try {
      res.setHeader('cache-control', 'no-store, max-age=0')
      await req.session.destroy()
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(200).json({ success: false })
    }
  }

  // Check Login
  async function getUser() {
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

  // Handle Request
  switch (req.method) {
    case 'GET':
      return getUser()
    case 'POST':
      return logout()
    case 'DELETE':
      return login()
    default:
      return res.status(200).json({ success: false })
  }
})
