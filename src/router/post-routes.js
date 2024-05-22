import express from ('express');
import {
  getPost, 
  deletePost,
  editPost,
  getPosts,
  addPost
} from ('../controllers/posts/apiPostsController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.put('/:id', editPost);

export default router;
