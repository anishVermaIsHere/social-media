
import { Router } from "express";
import { userController } from "../../controller/user/user.js";
import validator from "../../middlewares/validator.js";
import { createUserSchema, loginUserSchema } from "../../shared/validation/user.js";

const publicRouter=Router();
publicRouter.post('/', validator(loginUserSchema), userController.login);
publicRouter.post('/new', validator(createUserSchema), userController.register);

export default publicRouter;
