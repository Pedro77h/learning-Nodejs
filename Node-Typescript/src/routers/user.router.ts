import userController from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/register' , userController.register)

userRouter.post("/login" , userController.authenticate )

export default userRouter