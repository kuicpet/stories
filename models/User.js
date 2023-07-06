import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
  { timestamps: true, collection: 'Users' }
)

const User = models.User || model('User', UserSchema)

export default User
