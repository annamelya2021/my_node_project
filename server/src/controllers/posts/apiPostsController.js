
import Post from '../../models/postModel.js';
import RequestError from '../../helpers/errors/requestError.js';
import postController from './postController.js';



// const getAllPosts = async (req, res) => {
// const response = await Post.find(); 
// res.status(200).json(response)
// }

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author').exec();
  res.status(200).json(posts);
};


const createPost = async (req, res) => {
    const author = req.user._id;
    const { title, text } = req.body;
    const savedPost = await  Post.create({ title: title,
      text: text,
      author: author});
   
    res.status(201).json(savedPost);
  
}

const deletePost = async (req, res) => {
  const {id} = req.params;
  //console.log(id)
   const response = await Post.findByIdAndDelete(id);
   if (!response) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "Post successfully deleted" });
  };



const updatePost = async (req, res) => {
  const response = req.body;
  const { id } = req.params;

  const result = await postController.update(id, response);
  if (!result) {
    throw RequestError(401, "Course not found");
  }
  res.status(201).json(result);
}



const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate('author', 'username')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username' }
    });

  if (!post) {
    throw RequestError(401, "Post not found");
  }

  // Ensure comments field is always an array
  post.comments = post.comments || [];

  res.status(201).json(post);
};

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getPostComments
};
