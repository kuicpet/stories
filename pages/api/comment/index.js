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
      // Sort the comments in descending order based on their createdAt property
      const comment = {
        user: userId,
        content: content,
      }
      post.comments.push(comment)

      post.comments.sort((a, b) => b.createdAt - a.createdAt)
      await post.save()

      await post.populate('comments.user', 'username')
      const commentUser = post.comments.find(
        (comment) => comment.user._id.toString() === userId
      )

      res.status(201).json({
        success: true,
        data: {
          message: 'Comment added successfully',
          post: post,
          commentUser: {
            _id: commentUser.user._id,
            username: commentUser.user.username,
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
