import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function toggleLikePost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId } = req.body
      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }
      const userIndex = post.likes.findIndex((id) => id.toString() === userId)

      if (userIndex === -1) {
        // User hasn't liked the post yet, so add like
        post.likes.push(userId)
      } else {
        // User has already liked the post, so remove like
        post.likes.splice(userIndex, 1)
      }

      const updatedPost = await post.save()
      res.status(201).json({ success: true, date: updatedPost })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Failed to like on post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
