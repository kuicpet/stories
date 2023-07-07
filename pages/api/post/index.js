import Post from '../../../models/Post'
import db from '../../../utils/db'

export default async function getAllPosts(req, res) {
  try {
    await db.connect()
    const allPosts = await Post.find({})
    if (allPosts.length > 0) {
      res.status(200).send(allPosts)
    } else {
      res.status(400).json({ message: 'No Posts Found' })
    }
    await db.disconnect()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred fetching posts',
    })
  } finally {
    await db.disconnect()
  }
}
