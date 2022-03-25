import bcrypt from 'bcrypt'
import { withSessionRoute } from 'lib/server'
import { prisma } from 'lib/server'

export default withSessionRoute(async function route(req, res) {
  // LOGIN
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
      const user = await prisma.user.findUnique({ where: { email } })
      const match = await bcrypt.compare(password, user?.password)
      if (match) {
        req.session.user = { id: user?.id }
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

  async function logout() {
    try {
      res.setHeader('cache-control', 'no-store, max-age=0')
      await req.session.destroy()
      res.status(200).redirect('/')
      return
    } catch (error) {
      return res.status(200).json({ success: false })
    }
  }

  switch (req.method) {
    case 'GET':
      return logout()
    case 'POST':
      return login()
    default:
      return res.status(200).json({ success: false })
  }
})
