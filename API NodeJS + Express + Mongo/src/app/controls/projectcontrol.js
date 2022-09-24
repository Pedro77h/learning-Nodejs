const { application } = require("express")
const express = require("express")
const authmidleware = require("../middleware/auth")
const User = require('../model/user')
const Project = require('../model/project.js')
const Task = require('../model/task')


const router = express.Router()

router.use(authmidleware)

router.post('/', async (req, res) => {
    try {

        const { title, description, tasks } = req.body

        const project = await Project.create({ title, description, user: req.userId })

        await Promise.all(tasks.map(async task => {

            const projectTask = new Task({ ...task, project: project._id })

            await projectTask.save()

            project.tasks.push(projectTask)

        }))

        await project.save()

        res.send({ project })


    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error create new prooject' })

    }
})

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().populate(['user', 'tasks'])



        return res.send({ projects })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error Loading Projects" })
    }
})

router.get("/:projectId", async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks'])



        return res.send({ project })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error Loading Project" })
    }
})



router.put("/:projectId", async (req, res) => {
    try {

        const { title, description, tasks } = req.body

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description
        }, { new:true})


        project.tasks = []
        await Task.remove({ project: project._id})


        await Promise.all(tasks.map(async task => {

            const projectTask = new Task({ ...task, project: project._id })

            await projectTask.save()

            project.tasks.push(projectTask)

        }))

        await project.save()

        res.send({ project })


    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating project' })

    }
})

router.delete("/:projectId", async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId)



        return res.send()
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Error Delete Project" })
    }
})

module.exports = app => app.use('/projects', router)

