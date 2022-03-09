import Page from 'components/Page'
import { useQuery } from 'react-query'
import { getUser } from 'lib/helpers'

export default function Home() {
  const query = useQuery('user', getUser)
  const user = query?.data?.user

  if (query.isLoading) return null

  return (
    <Page title="Home">
      <div className="container py-8">
        <h1 className="font-bold text-3xl">Home</h1>
        Hello {user?.name ?? user?.email ?? 'guest'}!
      </div>
    </Page>
  )
}
