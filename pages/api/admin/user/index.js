import db from '../../../../utils/db'
import User from '../../../../models/User'

export default async function getAllUsers(req, res) {
  try {
    await db.connect()
    const allUsers = await User.find({})
    await db.disconnect()
    res.status(200).json(allUsers)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred fetching users',
    })
  }
}
