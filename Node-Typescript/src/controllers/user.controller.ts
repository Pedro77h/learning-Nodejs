import userModel from "../models/user.model";
import { Request, Response } from "express";

/* eslint-disable @typescript-eslint/class-name-casing */
class userController {



    public async register(req: Request, res: Response): Promise<Response> {
        try {

            const { email } = req.body

            if (await userModel.findOne({ email })){
                return res.status(422).send({error: 'User alredy exist'})
            }

                const User = await userModel.create(req.body)

            User.password = undefined

            return res.status(200).send({ User })

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'registration failed' })

        }
    }
}

export default new userController()