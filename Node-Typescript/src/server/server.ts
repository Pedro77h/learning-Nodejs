/* eslint-disable @typescript-eslint/class-name-casing */
import bodyparser from 'body-parser'
import { Server } from '@overnightjs/core'
import mongoose from 'mongoose'

export class serverInit extends Server {
    constructor(private port = 4030){
        super()
        this.setupExpress()
        this.routes()
        this.database()
    }

    public getApp():void{

        this.app.listen(this.port ,() =>{
            console.log('O servidor esta online')
        } )
        
    }

    private setupExpress():void {
        this.app.use(bodyparser.json())
    }

    private database():void {
        mongoose.connect('mongodb://localhost/typescript')
    }

    private routes():void {
        this.app.get('/' , (req , res) =>{
            return res.status(200)
        })
    }

}

