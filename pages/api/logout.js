import withSession from 'helpers/session'

export default withSession(async (req, res) => {
  // LOGOUT
  if (req.method === 'POST') {
    try {
      res.setHeader("cache-control", "no-store, max-age=0")
      await req.session.destroy()
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(200).json({ success: false })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false })
})
