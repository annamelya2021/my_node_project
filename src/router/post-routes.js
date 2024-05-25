import ctrlWrapper from "../helpers/ctrlWrapper.js";
import express from 'express';
import postControllers from '../controllers/posts/apiPostsController.js';
import { isAuthenticated ,isAdmin} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', ctrlWrapper(postControllers.getAllPosts));
router.post('/', isAuthenticated, ctrlWrapper(postControllers.createPost));
router.get('/:id',ctrlWrapper(postControllers.getOnePost));
router.delete('/:id',isAuthenticated, isAdmin, ctrlWrapper( postControllers.deletePost));
router.put('/:id',isAuthenticated, ctrlWrapper(postControllers.updatePost));

export default router;
