import withSession from 'helpers/session'

export default withSession(async (req: ApiReq, res: ApiRes) => {

  // LOGOUT
  if (req.method === 'GET') {
    try {
      res.setHeader("cache-control", "no-store, max-age=0")
      await req.session.destroy()
      return res.status(200).redirect('/')
    } catch (error) {
      return res.status(200).json({ success: false })
    }
  }

  // ANY OTHER METHOD
  return res.status(200).json({ success: false })
})
