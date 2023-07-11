import db from '../../../utils/db'
import Post from '../../../models/Post'
import User from '../../../models/User'

export default async function addComment(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId, content } = req.body

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' })
      }

      const comment = {
        user: userId,
        content: content,
      }
      post.comments.push(comment)

      const updatedPost = await post.save()

      res.status(201).json({
        success: true,
        data: {
          post: updatedPost,
          commentUser: {
            _id: user._id,
            username: user.username,
          },
        },
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ success: false, error: 'Failed to add comment to post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
