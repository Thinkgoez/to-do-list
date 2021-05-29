const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    autor: {
        type: String,
        default: 'Goose',
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    project: {
        ref: 'projects',
        type: Schema.Types.ObjectId
    }
})
// executer: {
    //     ref: 'users',
    //     type: Schema.Types.ObjectId
    // },
module.exports = mongoose.model('tasks', tasksSchema)