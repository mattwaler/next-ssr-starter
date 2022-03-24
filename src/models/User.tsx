import mongoose from 'mongoose'

export type UserCSR = null | {
  email: string
  name?: string
}

export interface UserSSR {
  email: string
  name?: string
  password: string
}

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string
    }
  }
}

const UserSchema = new mongoose.Schema<UserSSR>({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 64,
  },
  name: {
    type: String,
    maxlength: 128,
  },
  password: {
    type: String,
    required: true,
  },
})

export default mongoose.models?.User || mongoose.model('User', UserSchema)
