/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'

export default class MomentsController {
    public async store({request , response}:HttpContextContract) {
       
        const body = request.body()

        const moment = await Moment.create(body)

        return response.status(201).send({
            message: "Momento criado com sucesson" ,
            data: moment
        })
    }
}


