import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from 'next'
import { Session } from 'next-iron-session'

declare global {
  type ApiReq = NextApiRequest & { session: Session }
  type ApiRes = NextApiResponse
  type Context = GetServerSidePropsContext & { req: { session: Session } }
}
