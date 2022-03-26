import { User } from '@prisma/client'
import { createContext, useContext } from 'react'

export const UserContext = createContext<User | null>(null)

export default function useUserContext() {
  return useContext(UserContext)
}
