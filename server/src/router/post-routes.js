import ctrlWrapper from "../helpers/ctrlWrapper.js";
import express from 'express';
import postControllers from '../controllers/posts/apiPostsController.js';
import commentControllers from '../controllers/comments/apiCommentController.js';
import { isAuthenticated ,isAdmin} from "../middlewares/authMiddleware.js";



const router = express.Router();

router.get('/', ctrlWrapper(postControllers.getAllPosts));
router.post('/', isAuthenticated, ctrlWrapper(postControllers.createPost));
router.get('/:id',ctrlWrapper(postControllers.getOnePost));
router.delete('/:id',isAuthenticated, isAdmin, ctrlWrapper( postControllers.deletePost));
router.put('/:id',isAuthenticated, ctrlWrapper(postControllers.updatePost));
router.post('/:postId/comments', isAuthenticated, ctrlWrapper(commentControllers.createComment));
router.get('/:postId/comments', commentControllers.getCommentsByPostId);
router.delete('/:postId/comments/:commentId', isAuthenticated, isAdmin, commentControllers.deleteComment);




export default router;
