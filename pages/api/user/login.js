import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import db from '../../../utils/db'
import { signToken } from '../../../utils/auth'

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      if (!password || typeof password !== 'string') {
        throw new Error('Password is required') // Add validation for the password
      }
      await db.connect()
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user)
        res.status(200).json({
          token,
          _id: user._id,
          email: user.email,
          username: user.username,
          message: 'User Login successful',
        })
      } else {
        res.status(401).json({ message: 'Invalid username or password' })
      }
    } catch (error) {
      console.log(errors)
      res.status(500).json({
        success: false,
        message: 'An error occurred logging the user',
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
