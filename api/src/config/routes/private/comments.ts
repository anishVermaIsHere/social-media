import { Router } from "express";
import { commentController } from "../../../controller/posts/comments.js";
import { tokenVerify } from "../../../middlewares/tokenverify.js";

const commentRouter=Router();

commentRouter.get('/post/:id', tokenVerify, commentController.get);
commentRouter.post('/post/:id', tokenVerify, commentController.create);


export default commentRouter;

