import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { authconfig } from '../config/auth.config'
import { userInterface } from "../interface/user.interface";


// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface userModelInterface extends userInterface {
    comparePass(pass: string): Promise<string>
    generateToken(params:object):string
}


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        tolowercase: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
        required: false,
    }

})


userSchema.pre<userModelInterface>('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 10)

    next()
})

userSchema.pre<userModelInterface>('save', async function generateAvatar(next) {
    const randomId = Math.floor(Math.random() * (1000000)) + 1

    this.img = `https://avatars.dicebear.com/api/identicon/${randomId}.svg`


})

userSchema.methods.comparePass = function (pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.password)
}

userSchema.methods.generateToken = function (params:object): string {
   return jwt.sign(params , authconfig.secret , {
        expiresIn: 86400 ,
        noTimestamp: true
    })
}

export default model<userModelInterface>('User', userSchema)
