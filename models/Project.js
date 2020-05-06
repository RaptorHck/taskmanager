const mongoose = require('mongoose');

const ProjectsSchema = mongoose.Schema({
    name_project:{
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateCreate:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Project', ProjectsSchema);