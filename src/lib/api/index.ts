import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute as ssr } from 'lib/session'

interface ApiContext {
  req: NextApiRequest
  res: NextApiResponse
  user: { id: string } | null
}

declare global {
  type ApiRoute = (obj: ApiContext) => Promise<void>
}

interface ApiConfig {
  guarded: boolean
  methods: {
    DELETE?: ApiRoute
    GET?: ApiRoute
    PATCH?: ApiRoute
    POST?: ApiRoute
  }
}

function api(config: ApiConfig) {
  return ssr(async function route(req, res) {
    // Get Session
    const user = req.session.user ?? null

    // Guard Route
    if (config.guarded && !user)
      return res.status(200).json({
        success: false,
        message: 'User not logged in.',
      })

    // Fire Methods
    for (const method in config.methods) {
      if (req.method === method) {
        return config.methods[method]({ req, res, user })
      }
    }

    // Return Error for Other Methods
    return res
      .status(200)
      .json({ success: false, message: 'Unsupported HTTP Method.' })
  })
}

export default api
