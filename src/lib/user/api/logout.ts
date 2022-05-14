import { ApiRouteMethod } from "lib/api"

const logout: ApiRouteMethod = async ({ req, res, user }) => {
  res.setHeader('cache-control', 'no-store, max-age=0')
  await req.session.destroy()
  res.redirect(307, '/')
  return
}

export default logout
