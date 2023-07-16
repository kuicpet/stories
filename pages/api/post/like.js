import db from '../../../utils/db'
import Post from '../../../models/Post'
import User from '../../../models/User'

export default async function toggleLikePost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId } = req.body
      const post = await Post.findById(postId).populate('likes', 'username')
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      // Check if the post is already liked by the user
      const userLiked = post.likes.includes(userId)

      if (userLiked) {
        // User already liked the post, so we will unlike it
        post.likes.pull(userId)
      } else {
        // User has not liked the post, so we will like it
        post.likes.push(userId)
      }

      const updatedPost = await post.save()

      /*res.status(201).json({
        success: true,
        data: {
          post: updatedPost,
          likedUsers: updatedPost.likes.map((user) => user.username),
        },
      })*/
      return res.status(200).json({
        success: true,
        data: { updatedPost, message: 'Post unliked successfully' },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Failed to like on post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
