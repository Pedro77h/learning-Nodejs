import userModel from "../models/user.model";
import { Request, Response } from "express";

/* eslint-disable @typescript-eslint/class-name-casing */
class userController {



    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const User = await userModel.create(req.body)

            return res.status(200).send({ User })

        } catch (err) {
            return res.status(400).send({ error: 'registration failed' })
        }
    }
}

export default new userController()