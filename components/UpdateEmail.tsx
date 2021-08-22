import { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function UpdateEmail(props) {
  // Nodes
  const input = useRef(null)

  // State shorthands
  enum State { Default, Editing }
  const [state, setState] = useState(State.Default)
  const isDefault = state === State.Default
  const isEditing = state === State.Editing

  function startEditing(event) {
    event.preventDefault()
    setState(State.Editing)
    setTimeout(() => input.current.focus(), 250);
  }

  async function submitUpdate(event) {
    event.preventDefault()
    const { data } = await axios.patch('/api/user', { email: input.current.value })
    if (data.success) {
      toast.success(data.message)
      setState(State.Default)
      input.current.placeholder = input.current.value
      input.current.value = ''
    } else {
      toast.error(data.message)
      setState(State.Default)
      input.current.value = ''
    }
  }

  return (
    <form className="mt-4">
      <p>Email:</p>
      <input
        ref={input}
        placeholder={props.email}
        className={`rounded w-96`}
        type="email"
        disabled={!isEditing}
      />
      {isDefault && (
        <button
          className="bg-gray-700 px-4 py-2 rounded text-white ml-2"
          onClick={startEditing}
        >
          Edit
        </button>
      )}
      {isEditing && (
        <button
          className="bg-blue-700 px-4 py-2 rounded text-white ml-2"
          onClick={submitUpdate}
        >
          Save
        </button>
      )}
    </form>
  )
}
