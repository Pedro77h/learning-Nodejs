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
                assignedTo: req.user ,
                receiver: req.params._id
            })

            console.log(message.assignedTo)
        
            return res.send({ message })
        } catch (err) {

            console.log(err)
            return res.status(400).send({err})
        }

    }

}

export default new mensageController()