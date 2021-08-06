import bcrypt from 'bcrypt'
import connect from 'helpers/db'
import User from 'models/User'
import withSession from 'helpers/session'

export default withSession(async (req: ApiReq, res: ApiRes) => {

  // CREATE
  if (req.method == 'POST') {
    try {
      await connect()
      const hashedPassword = await bcrypt.hash( req.body.password, parseInt(process.env.SALT_ROUNDS) )
      await User.create({ ...req.body, password: hashedPassword })
      return res.status(200).json({ success: true })
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
      await connect()
      await User.findByIdAndUpdate(session.id, req.body, { new: true })
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      return res.status(200).json({ success: false })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false })

})
