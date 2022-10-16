import { authconfig } from "../config/auth.config";
import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken"
import { userInterface } from "@src/interface/user.interface";

/* eslint-disable @typescript-eslint/class-name-casing */
class authMiddleware {

    public authUserbytoken(req: Request, res: Response, next: NextFunction){
        try{
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

            req.user = iD

            return next()

        } catch (err) {

            return res.status(400).send({ error: "token error" })
        }






    }

}

export default new authMiddleware