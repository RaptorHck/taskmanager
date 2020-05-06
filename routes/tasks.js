const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// Crear una task
// api/tasks

router.post('/', 
    auth,
    [   
        check('projectId', "Project is requiered").not().isEmpty(),
        check('name_task', "Name's task is required").not().isEmpty()
        
    ],
    taskController.createTask
);

router.get('/',
    auth,
    taskController.obteinTasks
);

router.put('/:id',
    auth,
    taskController.updateTask
);

router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;