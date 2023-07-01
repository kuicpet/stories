import db from '../../../utils/db'
import Post from '../../../models/Post'

export default async function getAllPosts(req, res) {
  try {
    await db.connect()
    const allPosts = await Post.find({})
    await db.disconnect()
    res.status(200).send(allPosts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred fetching posts',
    })
  }
}
