import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      max: 20,
    },
    content: {
      type: String,
      max: 500,
    },
    comments: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: trues,
  }
)

const Post = models.Post || model('Post', PostSchema)

export default Post
