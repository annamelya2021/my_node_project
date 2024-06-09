import {Router} from "express";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import apiUserController from "../controllers/users/apiUserController.js";

const router  = Router();

router.post("/register",ctrlWrapper(apiUserController.register));
router.post("/login",ctrlWrapper(apiUserController.login));
router.post("/logout",ctrlWrapper(apiUserController.logout));

export default router;