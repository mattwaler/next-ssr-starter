import * as yup from 'yup'
import connect from 'lib/database'
import User from 'lib/user/model'
import { ApiRouteMethod } from 'lib/api'

const update: ApiRouteMethod = async ({ req, res, user }) => {
  try {
    // Validate Request
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
    })
    const isValid = schema.isValid(req.body)
    if (!isValid) throw new Error('Validation error.')

    // Connect to DB, Find User, and Update
    await connect()
    await User.findByIdAndUpdate(user?.id, req.body, { new: true })

    // Send Success
    return res
      .status(200)
      .json({ success: true, message: 'User updated successfully.' })
  } catch(error) {
    // Send Error
    return res.status(200).json({ success: false, message: error.message })
  }
}

export default update
