/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import db from '../../utils/db'

export default function (req, res) {
  // db.connect()
  res.status(200).json({ name: 'John Doe' })
}
