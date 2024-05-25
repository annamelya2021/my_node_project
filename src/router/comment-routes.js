import { Router } from 'express';
import commentControllers from '../controllers/comments/apiCommentController.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import {isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/', isAuthenticated, ctrlWrapper(commentControllers.createComment));
router.get('/:postId', isAuthenticated, ctrlWrapper(commentControllers.getCommentsByPostId));
router.delete('/:id', isAuthenticated, isAdmin, ctrlWrapper(commentControllers.deleteComment));

export default router;
