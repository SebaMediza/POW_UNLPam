const jwt = require("jsonwebtoken");
const {KEY_APP} = process.env;


//trae el token de la bd
const verifyToken = (req, res, next) =>{
    //x-access-token esta en el Thunder Client en el Header
    const token = req.headers["x-access-token"];
    console.log("el token que fue escrito en el header es: " + token)
    
    if(!token){
        return res.status(403).send("falta token");
    }

    try {
        //decodifica el token para ver la info
        const deco = jwt.verify(token, KEY_APP);
        //registrar la actividad
    } catch (error) {
        console.log(error);
        return res.status(401).send("token invalido");
    }
    
    return next();
}

module.exports = verifyToken;