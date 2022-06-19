const { application } = require("express")
const express = require("express")

const router = express.Router()

router.get("/", (request, response) => {
    response.send({ ok: true })
})

module.exports = app => app.use('/projects' , router)