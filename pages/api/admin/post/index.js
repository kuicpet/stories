import db from '../../../../utils/db'
import Post from '../../../../models/Post'

export default async function getAllPosts(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect()
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
}
