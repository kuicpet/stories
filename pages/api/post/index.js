import Post from '../../../models/Post'
import db from '../../../utils/db'
import User from '../../../models/User'

export default async function getAllPosts(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect()
      const allPosts = await Post.find({}).sort({ createdAt: -1 }).populate('userId', 'username')
      if (allPosts.length > 0) {
        res.status(200).json(allPosts)
      } else {
        res.status(400).json({ message: 'No Posts Found' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'An error occurred fetching posts',
      })
    } finally {
      await db.disconnect()
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
