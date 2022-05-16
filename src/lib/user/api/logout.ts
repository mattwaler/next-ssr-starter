const logout: ApiRoute = async ({ req, res }) => {
  // Destroy Session
  res.setHeader('cache-control', 'no-store, max-age=0')
  await req.session.destroy()

  // Redirect and Return
  res.redirect(307, '/')
  return
}

export default logout
