import db from '../../../utils/db'
import User from '../../../models/User'
import Post from '../../../models/Post'

export default async function getUserProfile(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect()

      const { userId } = req.query

      // fetch user profile
      const user = await User.findById(userId)

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' })
      }

      // Fetch user's posts
      const posts = await Post.find({ userId }).sort({ createdAt: -1 })

      // Fetch user's liked posts
      const likedPosts = await Post.find({ likes: userId }).sort({
        createdAt: -1,
      })

      // Fetch user's a bookmarked posts
      const bookmarkedPosts = await Post.find({ bookmarks: userId }).sort({
        createdAt: -1,
      })

      res.status(200).json({
        success: true,
        data: {
          user,
          posts,
          likedPosts,
          bookmarkedPosts,
        },
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ success: false, error: 'Failed to fetch user profile' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
