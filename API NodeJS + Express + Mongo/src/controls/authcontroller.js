
const express = require("express")

const User = require('../model/user')


const router = express.Router()

router.post("/register" , async (request , response) =>{
    const { email } = request.body

    try {

       if (await User.findOne( { email })) {
        return response.status(400).send({ error: 'User already exist'})
       }


        
        
        const user =  await User.create(request.body)
    
        return response.send({ user })
        

    } catch (err){
        return response.status(400).send({ error: "Registration Failed" })
    }

})

module.exports = app => app.use("/auth" , router)