import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: [250, "Tweet can't be 250 characters long "],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    postAnalytics: {
      likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      retweets: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
  },
  { timestamp: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
