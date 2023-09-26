import User from '../../../../../models/User'
import db from '../../../../../utils/db'
import { isAdmin, isAuth } from '../../../../../utils/auth'
import mongoose from 'mongoose'

const getUser = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await db.connect()

      // Check if the user is an admin
      if (!isAuth(req) || !isAdmin(req)) {
        return res.status(403).json({ success: false, error: 'Forbidden' })
      }

      const { userId } = req.query

      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.status(200).send(user)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    } finally {
      await db.disconnect()
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}

export default getUser
