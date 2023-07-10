import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function bookmarkPost(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect()
      const { postId, userId } = req.body
      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      const userIndex = post.bookmarks.findIndex(
        (id) => id.toString() === userId
      )

      if (userIndex === -1) {
        // User hasn't bookmarked the post yet, so add bookmark
        post.bookmarks.push(userId)
      } else {
        // User has already bookmarked the post, so remove bookmark
        post.bookmarks.splice(userIndex, 1)
      }

      const updatedPost = await post.save()

      res.status(200).json({ success: true, data: updatedPost })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ success: false, error: 'Failed to toggle bookmark on post' })
    } finally {
      await db.disconnect()
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}
