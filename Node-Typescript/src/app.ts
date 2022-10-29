/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/class-name-casing */
import bodyparser from 'body-parser'
import { Server } from '@overnightjs/core'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routers/user.router'
import messageRoute from './routers/message.route'


export class serverInit extends Server {
    constructor(private port = 4030){
        super()
        this.setupExpress()
        this.database()
        this.routes()
        this.getApp()
    }

    public getApp():void{

        this.app.listen(this.port ,() =>{
            console.log('O servidor esta online')
        } )
        
    }

    private setupExpress():void {
        this.app.use(bodyparser.json())
        this.app.use(cors())
    }

    private database():void {
        mongoose.connect('mongodb://127.0.0.1:27017/typescript')
    }

    private routes():void{
        this.app.use('/user' , userRouter)
        this.app.use('/message' , messageRoute)
    }

}


new serverInit(4030)

