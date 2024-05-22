
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
