import db from '../../../utils/db'
import Post from '../../../models/Post'
//import isAuth from '../../../utils/isAuth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Check if the user is authenticated
      /*if (!isAuth(req)) {
        return res.status(401).json({ success: false, error: 'Unauthorized' })
      }*/

      const { postId, userId } = req.body

      await db.connect()

      // Find the post by ID
      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      // Check if the post is already liked by the user
      const userLiked = post.likes.includes(userId)

      if (!userLiked) {
        // User hasn't liked the post, so we can't unlike it
        return res
          .status(400)
          .json({ success: false, error: 'Post not liked by the user' })
      }

      // Unlike the post
      post.likes.pull(userId)

      // Save the updated post
      const updatedPost = await post.save()

      return res.status(200).json({
        success: true,
        data: { updatedPost, message: 'Post unliked successfully' },
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Failed to unlike the post' })
    } finally {
      await db.disconnect()
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' })
}
