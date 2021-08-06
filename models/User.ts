import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'

interface User {
  email: String,
  password: String,
  hash: String,
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    unique: true,
    default: function() {
      return crypto.randomBytes(20).toString('hex')
    },
  },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
