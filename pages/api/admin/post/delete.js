import Post from '../../../../models/Post'
import db from '../../../../utils/db'
import mongoose from 'mongoose'

export default async function deletePost(req, res) {
  if (req.method === 'DELETE') {
    try {
      await db.connect()
      const { postId } = req.query

      // Check if postId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' })
      }
      const deletedPost = await Post.findByIdAndRemove(postId)
      if (!deletedPost) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      res
        .status(200)
        .json({ success: true, message: 'Post deleted successfully' })
    } catch (error) {
      console.log(error)
      res.status(404).json({ success: false, error: error.message })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(400).json({ message: 'Method not allowed' })
  }
}
