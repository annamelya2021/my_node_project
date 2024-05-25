import express from 'express';
import userController from '../controllers/users/apiUserController.js';
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/', userController.getAll);
// router.post('/', addUser);
router.get('/:id', userController.getById);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);

export default router;
