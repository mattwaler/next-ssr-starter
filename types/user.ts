import { ObjectId } from 'mongoose'
export {}

declare global {
  interface UserSSR {
    _id: ObjectId
    email: string
    name?: string
    password: string
    hash: string
  }

  interface UserCSR {
    email: string
    name?: string
  }
}

