import mongoose from 'mongoose'

const connection = {}

const connect = async () =>
  mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URI}`)
console.log('db connected')

const disconnect = async () => {
  if (process.env.NODE_ENV === 'production') {
    await mongoose.disconnect()
    console.log('db disconnected')
  }
}

function converDocToObj(doc) {
  doc._id = doc._id.toString()
  doc.createdAt = doc.createdAt.toString()
  doc.updatedAt = doc.updatedAt.toString()
  return doc
}

const db = { connect, disconnect, converDocToObj }

export default db
