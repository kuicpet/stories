import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({})

const User = models.User || model('User', UserSchema)

export default User
