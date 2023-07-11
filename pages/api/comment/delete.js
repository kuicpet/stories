import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function deleteComment(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()
      const { postId, commentId, userId } = req.body
      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      const commentIndex = post.comments.findIndex(
        (comment) =>
          comment._id.toString() === commentId &&
          comment.user.toString() === userId
      )

      if (commentIndex === -1) {
        return res
          .status(404)
          .json({ success: false, error: 'Comment not found' })
      }

      post.comments.slice(commentIndex, 1)
      const updatedPost = await post.save()

      res.status(200).json({ success: true, data: updatedPost })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ success: false, error: 'Failed to delete comment' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
