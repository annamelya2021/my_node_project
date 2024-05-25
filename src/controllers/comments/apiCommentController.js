import Comment from '../../models/commentModel.js';
import Post from '../../models/postModel.js';
import RequestError from '../../helpers/errors/requestError.js';

const createComment = async (req, res) => {
  const { postId, text, author } = req.body;
  if (!postId || !text || !author) {
    throw RequestError(400, "Missing required fields");
  }

  const newComment = new Comment({ text, author, post: postId });
  const comment = await newComment.save();

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

  res.status(201).json(comment);
};

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate('comments');
  if (!post) {
    throw RequestError(404, "Post not found");
  }
  res.status(200).json(post.comments);
};


const deleteComment = async (req, res) => {
  const { id } = req.params;
  const response = await Comment.findByIdAndDelete(id);
  if (!response) {
    throw RequestError(404, 'Comment not found');
  }
  res.status(200).json({ message: 'Comment deleted successfully' });
};

export default {
  createComment,
  getCommentsByPostId,
  deleteComment
};
