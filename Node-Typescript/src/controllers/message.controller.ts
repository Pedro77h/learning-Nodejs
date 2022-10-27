/* eslint-disable @typescript-eslint/class-name-casing */
import mongoose from "mongoose";
import messageModel from "../models/message.model";
import { Request, Response } from "express";

class mensageController {

    public async send(req: Request, res: Response): Promise<Response> {
        try {

            const message = await messageModel.create({
                text: req.body.text,
                assignedTo: req.user,
                receiver: req.userChat._id
            })

            return res.send({ message })
        } catch (err) {

            console.log(err)
            return res.status(400).send({ err })
        }

    }

    public async list(req: Request, res: Response):Promise<Response> {
        const idUserLogged = req.user
        const idUserChat = req.userChat._id

        const message = await messageModel.searchChat(idUserLogged , idUserChat).sort('creatAt') 


        const messageChat = message.map(message =>{
            return {
                text:message.text , 
                createdAt: message.creatAt ,
                isSender: message.assignedTo == String(idUserLogged)
            }
        })

        return res.status(200).send(messageChat)
    }

}

export default new mensageController()