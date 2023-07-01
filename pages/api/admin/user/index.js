import db from '../../../../utils/db'
import User from '../../../../models/User'

export default async function getAllUsers(req, res) {
  try {
    await db.connect()
    const allUsers = await User.find({})
    if (allUsers.length > 0) {
      res.status(200).json(allUsers)
    } else {
      res.status(400).json({ message: 'No Users Found' })
    }
    await db.disconnect()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred fetching users',
    })
  } finally {
    await db.disconnect()
  }
}
