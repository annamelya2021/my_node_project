import {Router} from "express";

import apiUserController from "../controllers/users/apiUserController.js";

const router  = Router();

router.post("/register",apiUserController.register);
router.post("/login",apiUserController.login);
router.post("/logout",apiUserController.logout )

export default router;