/* eslint-disable @typescript-eslint/class-name-casing */
import mongoose from "mongoose";
import messageModel from "../models/message.model";
import { Request, Response } from "express";
import { ObjectId } from "mongodb"

class mensageController {

    public async send(req: Request, res: Response): Promise<Response> {
        try {

            const message = await messageModel.create({
                text: req.body.text,
                assignedTo: req.user,
                receiver: req.userChat.id
            })

            return res.send({ message })
        } catch (err) {

            console.log(err)
            return res.status(400).send({ err })
        }

    }

    public async list(req: Request, res: Response) {
        const idUserLogged = req.user.id
        const idUserChat = req.userChat.id

        const message = await messageModel.find({
            $or: [
                { $and: [{user: idUserLogged} , {receiver: idUserChat}]} ,
                { $and: [{user: idUserChat} , {receiver: idUserLogged}]}
            ]
        })
    }

}

export default new mensageController()