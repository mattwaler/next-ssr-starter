import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
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
