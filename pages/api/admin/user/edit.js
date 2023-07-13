import db from '../../../../utils/db'
import User from '../../../../models/User'

export default async function editPost(req, res) {
  if (req.method === 'PUT') {
    try {
      await db.connect()
      const { userId } = req.query
      const user = await User.findByIdAndUpdate(userId)
      res
        .status(200)
        .json({ success: true, message: 'User updated successfully' })
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
