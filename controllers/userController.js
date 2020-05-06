const User = require('../models/User');
const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    //Revisar si hay error
    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()});
    }

    //Extraer Email and password
     const{email, password} = req.body;

    
    try{

        //Revisar que el usuario registrado sea unico

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exist'});
        }

        //Crea nuevo usuario
        user = new User(req.body);

        //Hashear a password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Guarda nuevo usuario
        await user.save();

        //Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        //Firm a token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error ) throw error;

            res.json({token});
        })

        

    }catch (error) { 
        console.log(error);
        res.status(400).send('There are erros');
    }
}   
