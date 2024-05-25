
import { Router } from "express";
import contactApiControllers from "../controllers/contacts/apiContactController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const router = Router();

router.get('/', ctrlWrapper(contactApiControllers.getContacts));
router.post('/', ctrlWrapper(contactApiControllers.createContact));
router.delete('/:id', ctrlWrapper(contactApiControllers.deleteContact));
router.put('/:id', ctrlWrapper(contactApiControllers.updateContact));

export default router;
