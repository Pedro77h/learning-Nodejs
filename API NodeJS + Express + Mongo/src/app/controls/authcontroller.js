const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const mailer = require('../../modules/mailer')
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

        if (!user) {
            return res.status(400).send({ error: 'user not found' })
        }

        const token = Generatetoken({})

        const date = new Date()

        date.setHours(date.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: date
            }
        })



        mailer.sendMail({
            to: email,
            from: 'bunter@yahoo.com.br',
            template: 'auth/forgot_password',
            context: { token }
        })
            , (err) => {
                if (err)
                    return res.status(400).send({ error: 'cannot send forgot password email' })
            }
        return res.send()
    }
    catch (err) {

        res.status(400).send({ error: 'erro on forgot password , try again :(' })
    }
})

router.post('/reset_password', async (req, res) => {
    const { email, token, newpassword } = req.body

    try {

        const user =await User.findOne({ email }).select('+passwordResetToken passwordResetExpires' )


        if (!user) {
            return res.status(400).send({ error: 'user not found' })
        }

        if (token !== user.passwordResetToken) {
            return res.status(400).send({ error: 'token invalid' })
            
        }
        const now = new Date()

        if (now > user.passwordResetExpires) {
            return res.status(400).send({ error: 'token expired , generate a new one' })
        }

        user.password = newpassword

        await user.save()

        res.send()

    } catch (err) {
        res.status(400).send({ error: "reset password error" })
        
    }
})



module.exports = app => app.use("/auth", router)