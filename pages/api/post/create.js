import Post from '../../../models/Post'
import db from '../../../utils/db'

export default async function createPost(req, res) {
  if (req.method === 'POST') {
    const post = req.body
    // Check if the post object and its properties are defined
    if (!post.userId || !post.title || !post.content) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete post data',
      })
    }

    const newPost = new Post({
      userId: req.userId, // Add the userId field from the post object
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
    })
    try {
      await db.connect()
      await newPost.save()
      res.status(201).json(newPost)
    } catch (error) {
      // console.log(error)
      res.status(500).json({
        success: false,
        message: error.message,
      })
    } finally {
      await db.disconnect()
    }
  }
}
