import User from '../../../models/User'
import db from '../../../utils/db'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'

export default async function updateProfile(req, res) {
  if (req.method === 'PUT') {
    try {
      await db.connect()
      const { username, email, password, photo } = req.body

      const existingUser = await User.findOne({ email })
      /*if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' })
      }*/

      if (!password || !password.trim()) {
        return res.status(400).json({ message: 'Invalid password format' })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      existingUser.password = hashedPassword
      existingUser.username = username || existingUser.username
      existingUser.photo = photo || existingUser.photo

      const updatedUser = await existingUser.save()

      const token = signToken(updatedUser)

      res.status(201).json({
        token,
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        photo: updatedUser.photo,
        message: 'User profile updated successful',
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
