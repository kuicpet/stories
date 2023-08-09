import db from '../../../utils/db'
import Post from '../../../models/Post'
import User from '../../../models/User'

export default async function bookmarkPost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId } = req.body

      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' })
      }

      const isBookmarked = user?.bookmarks?.includes(postId)

      if (isBookmarked) {
        user?.bookmarks?.pull(postId)
      } else {
        user?.bookmarks?.push(postId)
      }

      // Save the user's updated bookmarks
      await user.save()
      //  const updatedPost = await post.save()

      const responseMessage = !isBookmarked
        ? 'Bookmark removed'
        : 'Post bookmarked'

      res.status(200).json({
        success: true,
        data: {
          post,
          message: responseMessage,
          isBookmarked: isBookmarked,
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Failed to bookmark post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
