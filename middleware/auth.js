const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //Leer token from header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: "There are not token"});
    }

    //validar token
    try{
        const crypt = jwt.verify(token, process.env.SECRET);
        req.user = crypt.user;
        next();

    }catch(error) {
        res.status(401).json({msg: "Token invalid"});
    }
}