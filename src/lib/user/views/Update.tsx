import axios from 'axios'
import { toast } from 'react-hot-toast'
import { usePageContext } from 'components/Page'
import { useRouter } from 'next/router'
import Card from 'components/Card'
import createFormObject from 'lib/helpers/createFormObject'
import refetchServerProps from 'lib/helpers/refetchServerProps'

export default function UserUpdate() {
  const { user } = usePageContext()
  if (!user) return null

  const router = useRouter()

  async function update(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const form = createFormObject(event.currentTarget)
      const { data } = await axios.patch('/api/user/updateee', form)
      if (!data.success) throw new Error(data.message)
      refetchServerProps(router)
      return toast.success('Profile information updated.')
    } catch(error) {
      console.error(error)
      return toast.error(error.message)
    }
  }

  return (
    <Card
      heading="Update Profile Information"
      subheading="Use the form fields below to update your profile information."
    >
      <form onSubmit={update} className="grid grid-cols-1 gap-4">
        <label>
          <p>Email</p>
          <input
            className="input"
            name="email"
            type="text"
            defaultValue={user.email}
          />
        </label>
        <label>
          <p>Name</p>
          <input
            className="input"
            name="name"
            type="text"
            defaultValue={user.name}
          />
        </label>
        <div className="mt-3">
          <button className="button" type="submit">
            Update
          </button>
        </div>
      </form>
    </Card>
  )
}
