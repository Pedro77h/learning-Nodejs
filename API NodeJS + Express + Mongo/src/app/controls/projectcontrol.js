const { application } = require("express")
const express = require("express")
const authmidleware = require("../middleware/auth")
const User = require('../model/user')
const Project = require('../model/project.ts')
const Task = require('../model/task')


const router = express.Router()

router.use(authmidleware)

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find()

        

        return res.send({ projects })
        
    } catch(err) {
        console.log(err)
        return res.status(400).send({ error: "Error Loading Projects" })
    }
})

router.get("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

router.post('/', async (req, res) => {
    try {

        const project = await Project.create({...req.body , user: req.userId})

        res.send({ project })


    }
    catch (err) {

        return res.status(400).send({ error: 'Error create new prooject' })

    }
})

router.put("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

router.delete("/:projectId", async (req, res) => {
    res.send({ ok: true })
})

module.exports = app => app.use('/projects', router)