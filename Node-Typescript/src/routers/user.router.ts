import userController from "../controllers/user.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router()

userRouter.post('/register', userController.register)

userRouter.post("/login", userController.authenticate)

userRouter.get('/:id',
    authMiddleware.authUserbyParams,
    authMiddleware.authUserbytoken,
    userController.getById
)

userRouter.get('/',
    authMiddleware.authUserbytoken,
    userController.list
)


export default userRouter