import express from ('express');
import {
  getUser, 
  deleteUser,
  editUser,
  addUser
} from ('../controllers/users/apiUserController.js');
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/', getUser);
router.post('/', addUser);
router.get('/:id', getUser);
router.delete('/:id', isAdmin, deleteUser);
router.put('/:id', editUser);

export default router;
