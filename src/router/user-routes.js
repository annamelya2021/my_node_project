import express from 'express';
import userController from '../controllers/users/apiUserController.js';
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
const router = express.Router();

router.get('/',isAuthenticated, isAdmin, ctrlWrapper(userController.getAll));
router.get('/:id', isAuthenticated, ctrlWrapper(userController.getById)); 
router.delete('/:id',isAuthenticated, isAdmin, ctrlWrapper(userController.remove)); 
router.put('/:id', isAuthenticated, ctrlWrapper(userController.update));

export default router;
