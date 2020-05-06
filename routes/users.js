//Routes para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');

//Crear users
// api/users

router.post('/',
    [
        check('name', 'Names is required').notEmpty(),
        check('email', 'Use a email validate').isEmail(),
        check('password', 'A password could be a min 6 characters').isLength({min: 6})

    ],
    userController.createUser
);

module.exports = router;