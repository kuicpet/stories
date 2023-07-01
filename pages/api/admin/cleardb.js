import User from '../../../models/User'
import Post from '../../../models/Post'
import db from '../../../utils/db'

export default async function clear(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()
      await User.deleteMany()
      await Post.deleteMany()
      await db.disconnect()
      res.status(200).json({ message: 'Collection cleared successfully' })
    } catch (error) {
      console.log(error)
    } finally {
      await db.disconnect()
    }
  }
}
