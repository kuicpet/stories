import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function deleteComment(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()

      const { postId, commentId } = req.body

      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      )

      if (!updatedPost) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      return res
        .status(200)
        .json({ success: true, message: 'Comment deleted successfully' })
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
