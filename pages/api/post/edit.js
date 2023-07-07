import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function editPost(req, res) {
  if (req.method === 'PUT') {
    try {
      await db.connect()
      const { postId, title, content } = req.body
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          content,
        },
        { new: true }
      )
      res.status(200).json({ success: true, data: updatedPost })
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
