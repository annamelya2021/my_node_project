import ctrlWrapper from "../helpers/ctrlWrapper.js";
import express from 'express';
import allPosts from '../controllers/posts/apiPostsController.js';
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', ctrlWrapper(allPosts.getAllPosts));
router.post('/', isAuthenticated, ctrlWrapper(allPosts.createPost));
router.get('/:id',ctrlWrapper(allPosts.getOnePost));
router.delete('/:id',isAuthenticated, ctrlWrapper( allPosts.deletePost));
router.put('/:id',isAuthenticated, ctrlWrapper(allPosts.updatePost));

export default router;
