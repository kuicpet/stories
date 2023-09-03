import User from '../../../models/User'
import db from '../../../utils/db'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'

export default async function register(req, res) {
  if (req.method === 'PATCH') {
    try {
      await db.connect()
      const { username, email, password, photoUrl } = req.body

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User with this email already exists' })
      }

      if (!password || !password.trim()) {
        return res.status(400).json({ message: 'Invalid password format' })
      }

      // Determine the user role
      const role = username === 'admin' ? 'admin' : 'user'
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      })

      const token = signToken(newUser)

      res.status(201).json({
        token,
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        message: 'User registration successful',
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
