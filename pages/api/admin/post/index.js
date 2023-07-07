import db from '../../../../utils/db'
import Post from '../../../../models/Post'
import { isAdmin, isAuth } from '../../../../utils/auth'

export default async function getAllPosts(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect()
      
      // Check if the user is an admin
      if (!isAuth(req) || !isAdmin(req)) {
        return res.status(403).json({ success: false, error: 'Forbidden' })
      }

      const allPosts = await Post.find({})
      if (allPosts.length > 0) {
        res.status(200).json({ data: allPosts })
      } else {
        res.status(400).json({ message: 'No Posts Found' })
      }
      await db.disconnect()
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'An error occurred fetching users',
      })
    } finally {
      await db.disconnect()
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' })
}
