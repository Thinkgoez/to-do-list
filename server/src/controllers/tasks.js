const Task = require('../models/Task')
const Project = require('../models/Project')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getByProjectID = async function (req, res) {
    try {
        const project = await Project.findById(req.params.projectID) // find current project
        const tasks = await Task.find({ '_id': { $in: project.tasks } })
        res.status(200).json(tasks)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Task.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.create = async function (req, res) {
    try {
        const task = await new Task({
            title: req.body.title,
            project: req.params.projectID,
            autor:  req.user.username || undefined,
        }).save()

        const project = await Project.findById(req.params.projectID)
        project.tasks.push(task._id)
        await Project.findOneAndUpdate(
            { _id: req.params.projectID },
            { $set: { tasks: project.tasks } },
            { new: true }
        )
        res.status(201).json(task)
    } catch (error) {
        errorHandler(res, error)
    }

}
module.exports.update = async function (req, res) {
    try {
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(task)
    } catch (error) {
        errorHandler(res, error)
    }
}