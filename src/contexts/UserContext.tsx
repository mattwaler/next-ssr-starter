import { createContext, useContext } from 'react'
import { UserCSR } from 'models/User'

export const UserContext = createContext<UserCSR|null>(null)
export const useUser = () => useContext(UserContext)
