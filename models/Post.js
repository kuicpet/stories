import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema(
  {
    userId: {
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    collection: 'Posts',
  }
)

const Post = models.Post || model('Post', PostSchema)

export default Post
