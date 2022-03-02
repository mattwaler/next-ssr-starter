import mongoose from 'mongoose'
import crypto from 'crypto'

export interface UserCSR {
  email: string
  name?: string
}

export interface UserSSR {
  email: string
  name?: string
  password: string
  hash: string
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
  hash: {
    type: String,
    unique: true,
    default: function () {
      return crypto.randomBytes(20).toString('hex')
    },
  },
})

export default mongoose.models?.User || mongoose.model('User', UserSchema)
