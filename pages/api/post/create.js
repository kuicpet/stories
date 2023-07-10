import db from '../../../utils/db'
import Post from '../../../models/Post'
import User from '../../../models/User'

export default async function createPost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { userId, title, content } = req.body
      const newPost = new Post({ userId, title, content })
      const savedPost = await newPost.save()
      const user = await User.findOne({ _id: userId })
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' })
      }
      const { username } = user
      res
        .status(201)
        .json({
          message: 'Post created succesfully',
          data: { savedPost, username },
        })
    } catch (error) {
      console.log(error)
      res.status(404).json({ error: error.message })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(400).json({ message: 'Method not allowed' })
  }
}
