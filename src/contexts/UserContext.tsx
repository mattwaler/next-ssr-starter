import { createContext, useContext } from 'react'
import { UserCSR } from 'models/User'

export const UserContext = createContext<UserCSR>(null)

export default function useUserContext() {
  return useContext(UserContext)
}
