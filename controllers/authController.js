const User = require('../models/User');
const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authUser = async (req, res) => {

    //Revisar si hay error
    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()});
    }

    //Extraer email and password

    const {email, password} = req.body;

    try{
        //revisar usuario registrado
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({msg: "User no exists!"});
        }
        //revisar password
        const passCorrect = await bcryptjs.compare(password, user.password);
        if(!passCorrect){
            return res.status(400).json({msg: "Password incorrect"});
        }

        //Si todo es correcto
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600,
        }, (error, token) => {
            if(error) throw error;
            
            //Mesaje de confirmacion
            res.json({token});
        });

    }catch (error){
        console.log(error);
    }

}

exports.userAuthenticated = async (req, res) => {

    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
        
    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'There Are errors'});
    }
}