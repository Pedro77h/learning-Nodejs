import messageController from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

const messageRoute = Router()

messageRoute.post('/:id' ,
authMiddleware.authUserbyParams ,
authMiddleware.authUserbytoken, 
messageController.send
)

messageRoute.get('/:id' ,
authMiddleware.authUserbyParams ,
authMiddleware.authUserbytoken, 
messageController.list
)

export default messageRoute