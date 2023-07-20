import db from '../../../utils/db'
import Post from '../../../models/Post'
import User from '../../../models/User'

export default async function bookmarkPost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId } = req.body

      const post = await Post.findById({ _id: postId })
      const user = await User.findById({ _id: userId })

      if (!post || !user) {
        return res
          .status(404)
          .json({ success: false, error: 'Post or sser not found' })
      }

      const isBookmarked = user.bookmarks.includes(postId)
      if (isBookmarked) {
        user.bookmarks.pull(postId)
      } else {
        user.bookmarks.push(postId)
      }

      // Save the user's updated bookmarks
      await user.save()
      //  const updatedPost = await post.save()

      res.status(200).json({
        success: true,
        message: isBookmarked
          ? 'Post removed from bookmarks'
          : 'Post bookmarked successfully',
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
