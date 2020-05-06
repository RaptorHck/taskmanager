const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//Crear projects
// api/projects
router.post('/',
    auth,
    [
        check('name_project', "Project's name is required").not().isEmpty()
    ],
    projectController.createProject
);

router.get('/',
    auth,
    projectController.obteinProjects
);

//Actualizar project via ID
router.put('/:id',
    auth,
    [
        check('name_project', "Project's name is required").not().isEmpty()
    ],
    projectController.updateProjects
);


router.delete('/:id',
    auth,
    projectController.deleteProject
    )
module.exports = router;