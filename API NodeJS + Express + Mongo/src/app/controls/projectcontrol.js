const { application } = require("express")
const express = require("express")
const authmidleware = require("../middleware/auth")
const Project = require('../model/project')
const Task = require('../model/task')


const router = express.Router()

router.use(authmidleware)

router.get("/", async (req, res) => {
    res.send({ ok: true })
})

router.get("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

router.post('/' , async (req , res) =>{
    try{

    }
    catch(err){
        return res.status(400).send({ error: 'Registration Failed'})   
    }
})

router.put("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

router.delete("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

module.exports = app => app.use('/projects' , router)