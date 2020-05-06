const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        red:'Project'
    },
    name_task:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false,

    },
    dateCreate:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Task', TaskSchema);