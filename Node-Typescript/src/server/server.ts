/* eslint-disable @typescript-eslint/class-name-casing */

import { Server } from '@overnightjs/core'

export class serverInit extends Server {
    constructor(private port = 4030){
        super()
    }

    public getApp():void{

        this.app.listen(this.port ,() =>{
            console.log('O servidor esta online')
        } )
        
    }
}

export const app = new serverInit