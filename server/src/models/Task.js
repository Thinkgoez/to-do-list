const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
    // executer: {
    //     ref: 'users',
    //     type: Schema.Types.ObjectId
    // },
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

module.exports = mongoose.model('tasks', notesSchema)