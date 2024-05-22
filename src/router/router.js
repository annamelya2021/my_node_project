import { Router } from "express";
import postRouter from "./post-routes.js";
import contactRouter from "./contact-routes.js";
import userRouter from "./user-routes.js";
import authRouter from "./authRouter.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = Router();

router.get('/posts', postRouter);
router.get('/contacts', contactRouter);
router.use("/user",isAuthenticated, userRouter);
router.use("/",authRouter);


export default router;