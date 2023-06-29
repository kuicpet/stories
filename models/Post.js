import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 20,
    },
    description: {
      type: String,
      max: 500,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: trues,
  }
)

const Post = models.Post || model('Post', PostSchema)

export default Post
