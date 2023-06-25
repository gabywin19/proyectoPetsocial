const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, payload) => {
         if(err){
            res.status(401).json({
                msg:"Credenciales Invalidas, debe loguearse Nuevamente",
                err,
            })
        }else{
            next();
        }
    })
}