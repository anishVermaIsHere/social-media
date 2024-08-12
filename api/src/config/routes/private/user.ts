import { Router } from "express";
import { tokenVerify } from "../../../middlewares/tokenverify.js";
import { userController } from "../../../controller/user.js";


const userRouter=Router();

userRouter.post("/search", tokenVerify, userController.search);
userRouter.post("/follow", tokenVerify, userController.follow);
userRouter.post("/unfollow", tokenVerify, userController.unfollow);


export default userRouter;