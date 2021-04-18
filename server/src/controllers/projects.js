const Project = require('../models/Project')
const Task = require('../models/Task')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const projects = await Project.find({ $or: [{ isPublic: 'readonly' }, { isPublic: 'writable' }, { owner: req.user.id }] })
        // let projectWithOwnerName = await JSON.parse(JSON.stringify(projects)).map(async (pr) => {
        //     let usOwner = await User.findById(pr.owner)
        //     console.log({...pr})
        //     return { ...pr, ownerName: usOwner.username }
        // })
        // console.log(projectWithOwnerName)
        res.status(200).json(projects)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.getByID = async function (req, res) {
    try {
        const project = await Project.findById(req.params.id)
        res.status(200).json({project})
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Project.remove({ _id: req.params.id })
        await Task.remove({ project: req.params.id })
        res.status(200).json({
            message: 'Проект успешно удален!'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.create = async function (req, res) {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            isPublic: req.body.isPublic,
            owner: req.user.id
        })
        await project.save()
        res.status(201).json(project)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.update = async function (req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(project)
    } catch (error) {
        errorHandler(res, error)
    }
}