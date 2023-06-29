import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profileImage: {
      type: String,
      default: '',
    },
    /*description: {
      type: String,
      max: 50,
    },*/
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const User = models.User || model('User', UserSchema)

export default User
