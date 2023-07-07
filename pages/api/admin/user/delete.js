import User from '../../../../models/User'
import db from '../../../../utils/db'
import mongoose from 'mongoose'

export default async function deleteUser(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()
      const { userId } = req.query

      // Check if postId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' })
      }
      const deletedUser = await User.findByIdAndRemove(userId)
      if (!deletedUser) {
        return res.status(404).json({ success: false, error: 'User not found' })
      }

      res
        .status(200)
        .json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
      console.log(error)
      res.status(404).json({ success: false, error: error.message })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(400).json({ message: 'Method not allowed' })
  }
}
