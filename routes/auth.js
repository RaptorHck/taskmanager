//Routes para crear auths
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//Crear auths
// api/auth

router.post('/',
    authController.authUser
);

router.get('/',
    auth,
    authController.userAuthenticated
)

module.exports = router;