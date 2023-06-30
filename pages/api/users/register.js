import User from '../../../models/User'
import db from '../../../utils/db'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth'

export default async function register(req, res) {
  const { username, email, password } = req.body
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required')
    }
    await db.connect()
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists ' })
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10) // Use async hashing
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    const user = await newUser.save()
    const token = signToken(user)
    res.status(201).json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      message: 'User registration succesful',
    })
    await db.disconnect()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred registering the user',
    })
  }
}
