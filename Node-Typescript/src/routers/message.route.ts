import messageController from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

const messageRoute = Router()

messageRoute.post('/:_id' , authMiddleware.authUserbytoken, messageController.send)


export default messageRoute