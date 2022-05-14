import { Schema, models, model } from 'mongoose'
import { ObjectId } from 'bson'

declare global {
  interface UserCSR {
    _id: ObjectId
    email: string
    name: string
  }

  interface UserSSR extends UserCSR {
    password: string
  }
}

const UserSchema = new Schema<UserSSR>({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    maxlength: 64,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    maxlength: 128,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
})

UserSchema.index({ location: '2dsphere' })

export default models?.User || model('User', UserSchema)
