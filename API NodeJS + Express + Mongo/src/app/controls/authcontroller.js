const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const authConfig = require("../../config/auth.json")
const User = require('../model/user')


const router = express.Router()

function Generatetoken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post("/register", async (request, response) => {
    const { email } = request.body

    try {

        if (await User.findOne({ email })) {
            return response.status(400).send({ error: 'User already exist' })
        }



        const user = await User.create(request.body)

        user.password = undefined

        return response.send({
            user,
            token: Generatetoken({ id: user.id })
        })


    } catch (err) {
        return response.status(400).send({ error: "Registration Failed" })
    }

})

router.post('/authenticate', async (request, response) => {

    const { email, password } = request.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {

        return response.status(400).send({ error: "User not Found" })
    }
    if (!await bcrypt.compare(password, user.password)) {

        return response.status(400).send({ error: "Invalid password" })
    }

    user.password = undefined


    response.send({
        user,
        token: Generatetoken({ id: user.id })
    })
})

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).send({error: 'user not found'})
        }

        const token = crypto.randomBytes(20).toString('hex')

        const date = new Date()

        date.setHours(date.getHours()+ 1)

        await User.findByIdAndUpdate(user.id , {
            '$set':{
                passwordResetToken: token ,
                passwordResetExpires: date
            }
        })

    }
    catch{
        res.status(400).send({error: 'erro on forgot password , try again :('})
    }
})

module.exports = app => app.use("/auth", router)