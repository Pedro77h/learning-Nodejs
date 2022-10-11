import userController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/register' , userController.register)

export default userRouter