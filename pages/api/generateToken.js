import shortid from 'shortid'
import db from '../../utils/db'

export default async function generateToken(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect()
      // Generate a confirmation token using shortid
      const confirmationToken = shortid.generate()

      // Return the generated token as a JSON response
      res.status(200).json({ token: confirmationToken })
    } catch (error) {
      console.error('Error generating confirmation token:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
