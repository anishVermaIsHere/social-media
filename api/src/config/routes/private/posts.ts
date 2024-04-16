"use strict";
import { Router } from "express";
import validator from "../../../middlewares/validator.js";
import { postSchema } from "../../../shared/validation/posts.js";
import { postController } from "../../../controller/posts/posts.js";
import { uploadOnCloud, uploadOnServer } from "../../../middlewares/uploadfile.js";
import { tokenVerify } from "../../../middlewares/tokenverify.js";


const postRouter=Router();
postRouter.post('/', tokenVerify, uploadOnServer.single('image'), uploadOnCloud, validator(postSchema), postController.create);


export default postRouter;
