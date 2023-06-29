import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({})

const Post = models.Post || model('Post', PostSchema)

export default Post
