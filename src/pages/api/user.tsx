import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'
import { prisma, withSessionRoute } from 'lib/server'

export default withSessionRoute(async function route(req, res) {
  // CREATE
  async function createUser() {
    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS)
      )
      await prisma.user.create({ data: {
        ...req.body, password: hashedPassword
      }})
      return res
        .status(200)
        .json({ success: true, message: 'User created successfully.' })
    } catch (error) {
      console.error(error)
      return res.status(200).json({ success: false })
    }
  }

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
      await prisma.user.update({
        where: { id: user.id },
        data: { ...req.body }
      })
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

  switch (req.method) {
    case 'POST':
      return createUser()
    case 'PATCH':
      return updateUser()
    default:
      return res.status(200).json({ success: false })
  }
})
