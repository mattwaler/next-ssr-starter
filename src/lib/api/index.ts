import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/session'

interface ApiMethodObject {
  req: NextApiRequest
  res: NextApiResponse
  user: { id: string } | null
}

export type ApiRouteMethod = (obj: ApiMethodObject) => Promise<void>

interface ApiRouteConfig {
  guarded: boolean
  methods: {
    DELETE?: ApiRouteMethod
    GET?: ApiRouteMethod
    PATCH?: ApiRouteMethod
    POST?: ApiRouteMethod
  }
}

function api(config: ApiRouteConfig) {
  return withSessionRoute(async function route(req, res) {
    try {
      // Get Session
      const user = req.session.user ?? null

      // Guard Route
      if (config.guarded && !user) throw new Error('No user session found.')

      // Fire Methods
      for (const method in config.methods) {
        if (req.method === method) {
          return config.methods[method]({ req, res, user })
        }
      }

      // Unsupported Method
      throw new Error('Unsupported HTTP Method')
    } catch(error) {
      console.error(error.message)
      return res.status(200).json({ success: false, message: error.message })
    }
  })
}

export default api
