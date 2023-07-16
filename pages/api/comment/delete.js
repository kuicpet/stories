import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function deleteComment(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()
      const { postId, commentId } = req.body
      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      /*const commentIndex = post.comments.findIndex(
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
      const updatedPost = await post.save()*/
      const comment = await Comment.findById(commentId)
      if (!comment) {
        return res
          .status(404)
          .json({ success: false, error: 'Comment not found' })
      }

      // Ensure that the comment belongs to the correct post
      if (comment.postId.toString() !== postId) {
        return res.status(400).json({
          success: false,
          error: 'Comment does not belong to the specified post',
        })
      }

      await comment.remove()
      res
        .status(200)
        .json({ success: true, message: 'comment deleted successfully' })
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
