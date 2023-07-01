import Post from '../../../../models/Post'
import db from '../../../../utils/db'
import mongoose from 'mongoose'

const getPost = async (req, res) => {
  if (req.method === 'GET') {
    const { postId } = req.query

    try {
      await db.connect()
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' })
      }
      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      return res.status(200).json(post)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    } finally {
      await db.disconnect()
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}

export default getPost
