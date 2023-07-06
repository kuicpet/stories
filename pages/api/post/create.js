import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function createPost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { userId, title, content } = req.body
      const newPost = new Post({ userId, title, content })
      const savedPost = await newPost.save()
      res
        .status(201)
        .json({ message: 'Post created succesfully', data: savedPost })
    } catch (error) {}
  } else {
    res.status(400).json({ message: 'Method not allowed' })
  }
}
