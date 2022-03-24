import { Schema, models, model } from 'mongoose'

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

const UserSchema = new Schema<UserSSR>({
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

export default models?.User || model('User', UserSchema)
