import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function toggleLikePost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()

      const { postId, userId } = req.body

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId } },
        { new: true }
      )

      if (!updatedPost) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      const message = updatedPost.likes.includes(userId)
        ? 'Post liked successfully'
        : 'Post unliked successfully'

      return res.status(200).json({ success: true, data: { updatedPost, message } })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Failed to like/unlike post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}