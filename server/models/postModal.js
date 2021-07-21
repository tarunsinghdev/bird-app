import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: { type: Boolean },
    likeusers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
export default Post;
