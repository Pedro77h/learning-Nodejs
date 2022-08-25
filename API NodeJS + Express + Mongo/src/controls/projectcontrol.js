const { application } = require("express")
const express = require("express")
const authmidleware = require("../middleware/auth")


const router = express.Router()

router.use(authmidleware)

router.get("/", (request, response) => {
    response.send({ ok: true , user: req.user.id})
})

module.exports = app => app.use('/projects' , router)