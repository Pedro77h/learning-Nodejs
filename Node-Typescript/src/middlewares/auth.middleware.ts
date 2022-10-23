import { authconfig } from "../config/auth.config";
import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken"
import { userInterface } from "../interface/user.interface";
import userModel from "../models/user.model";

/* eslint-disable @typescript-eslint/class-name-casing */
class authMiddleware {

    public authUserbytoken(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader) {
                return res.status(401).send({ message: "no token provied" })
            }

            const parts = authHeader.split(' ')

            if (!(parts.length === 2)) {
                console.log(parts)
                return res.status(401).send({ error: "Token error" })
            }

            const [scheme, token] = parts

            if (!/^Bearer$/i.test(scheme)) {
                return res.status(401).send({ error: "token malformated" })
            }

            const iD = verify(token, authconfig.secret) as userInterface



            req.user = iD.id

            return next()

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "token error" })
        }

    }

    public async authUserbyParams(req: Request, res: Response, next: NextFunction){
        try {
            
            const user = await userModel.findById(req.params.id)
            

            if(!user){
                res.status(400).send({error: "User not found"})

            }

            req.userChat = user

            return next()

        } catch (err) {
            res.status(401).send({error: "User Invalid"})
            console.log(err)
        }
    }

}



export default new authMiddleware