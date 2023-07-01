import User from '../../../../models/User'
import db from '../../../../utils/db'
import mongoose from 'mongoose'

const getUser = async (req, res) => {
  if (req.method === 'GET') {
    const { userId } = req.query

    try {
      await db.connect()
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' })
      }
      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.status(200).json(user)
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
