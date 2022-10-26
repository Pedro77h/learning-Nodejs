import userModel from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { userModelInterface } from "@src/models/user.model"
import messageModel from "../models/message.model";

/* eslint-disable @typescript-eslint/class-name-casing */
class userController {



    public async register(req: Request, res: Response): Promise<Response> {
        try {

            const { email } = req.body

            if (await userModel.findOne({ email })) {
                return res.status(422).send({ error: 'User alredy exist' })
            }

            const User = await userModel.create(req.body)

            User.password = undefined
            User.img = undefined



            return res.status(200).send({ User })

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'registration failed' })

        }
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body
            const User = await userModel.findOne({ email }).select('+password')

            if (!User) {
                res.status(400).send({ error: 'User doesn´t exist' })
            }


            if (!await User?.comparePass(password)) {
                return res.status(400).send({ error: 'password doesn´t match' })
            }

            const token = User?.generateToken({ id: User.id })


            return res.status(200).send({
                User,
                token
            })
        } catch (err) {
            return res.status(400)
        }
    }

    public getById(req: Request, res: Response): Response {

        req.userChat.password = undefined

        return res.status(200).send(req.userChat)
    }

    public async list(req: Request, res: Response): Promise<Response>{
        const idUser = req.user


        const users = await userModel.find({
            _id: { $ne: idUser }
        })


        const userMessage = users.map(user =>{
            return messageModel.searchChat(idUser , user._id)
            .sort('-creatAt')
            .limit(1)
        })

        
        return res.status(200).send(users)

    }

}

export default new userController()