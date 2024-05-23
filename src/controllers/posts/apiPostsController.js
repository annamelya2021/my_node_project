
import Post from '../../models/postModel.js';
import RequestError from '../../helpers/errors/requestError.js';
import postController from '../posts/postController.js';



const getAllPosts = async (req, res) => {
const response = await Post.find(); 
res.status(200).json(response)
}

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
  console.log(id)
   const response = await Post.findByIdAndDelete(id);
   if (!response) {
    throw RequestError(404, "Not found");
  }
    res.status(204).json(response)
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

  const result = await postController.getById(id);
  if (!result) {
    throw RequestError(401, "Course not found");
  }
  res.status(201).json(result);
}


export default {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  getOnePost
};
