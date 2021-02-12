const Project = require('../models/Project')
const Task = require('../models/Task')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res){
    try{
        const projects = await Project.find({})
        res.status(200).json(projects)
    } catch(error) {
        errorHandler(res, error)
    }
}
module.exports.getByID = async function(req, res){
    try{
        const project = await Project.findById(req.params.id)
        res.status(200).json(project)
    } catch(error) {
        errorHandler(res, error)
    }
}
module.exports.remove = async function(req, res){
    try{
        await Project.remove({_id: req.params.id})
        await Task.remove({project: req.params.id})
        res.status(200).json({
            message: 'Проект успешно удален!'
        })
    } catch(error) {
        errorHandler(res, error)
    }
}
module.exports.create = async function(req, res){
    try{
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            owner: req.user.id
        })
        await project.save()
        res.status(201).json(project)
    } catch(error) {
        errorHandler(res, error)
    }
}
module.exports.update = async function(req, res){
    try{
        const project = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(project)
    } catch(error) {
        errorHandler(res, error)
    }
}