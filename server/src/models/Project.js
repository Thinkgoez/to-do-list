const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectsSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    tasks: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    description: {
        type: String,
        default: ''
    },
    isPublic: {
        type:  Schema.Types.Mixed,
        default: false
    }
})

module.exports = mongoose.model('projects', projectsSchema)