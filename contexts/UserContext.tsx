import { createContext, useContext } from 'react'
import { User } from '@prisma/client'

export const UserContext = createContext<User|null>(null)

export default function useUserContext() {
  return useContext(UserContext)
}
