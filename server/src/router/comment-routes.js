import { Router } from 'express';
import commentControllers from '../controllers/comments/apiCommentController.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import {isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';


const router = Router();

// router.post('/', isAuthenticated, ctrlWrapper(commentControllers.createComment));
// router.get('/:postId', isAuthenticated, ctrlWrapper(commentControllers.getCommentsByPostId));
// router.delete('/:id', isAuthenticated, isAdmin, ctrlWrapper(commentControllers.deleteComment));

// src/routes/comment-routes.js


router.post('/:postId', isAuthenticated, commentControllers.createComment);
router.get('/:postId', commentControllers.getCommentsByPostId);
router.delete('/:postId/:commentId', isAuthenticated, commentControllers.deleteComment);

router.post('/:postId/comments', isAuthenticated, ctrlWrapper(commentControllers.createComment));


export default router;
