/* eslint-disable @typescript-eslint/class-name-casing */
import { Controller, Get } from '@overnightjs/core';
import {Request , Response} from 'express'
import {app} from './server/server'

@Controller('/')
export class rota {
    
    @Get(':id')
    get(req:Request , res: Response){
        console.log(req.params.id)
        return res.status(200).send({msg: 'get concluido'})
    }


}