import { Router } from 'express';
import commentControllers from '../controllers/comments/apiCommentController.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';


const router = Router();

router.post('/', ctrlWrapper(commentControllers.createComment));
router.get('/:postId', ctrlWrapper(commentControllers.getCommentsByPostId));
router.delete('/:id', ctrlWrapper(commentControllers.deleteComment));

export default router;
