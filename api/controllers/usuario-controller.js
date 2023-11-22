const User = require("../model/usuario-model.js");
const Tarjeta = require("../model/tarjeta-model.js");
global.myAppToken = null

exports.registro = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
    const user = new User({
      nombre : req.body.nombre,
      mail : req.body.mail,
      password : req.body.password,
      tipoPlan : req.body.tipoPlan
    });
    
    const tarjeta = new Tarjeta({
        nroTarjeta : req.body.nroTarjeta,
        vencimiento :  req.body.vencimiento,
        ccv : req.body.ccv,
        idUsuario: '',   //cambiar por la consulta a la bd para saber cual es el usaurio que la carga
    });
    User.registro(user, tarjeta, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "error al crear el nuevo usuario."
            });
        else res.send(data);
    });
    
};

exports.login = (req, res, callback) =>{
    const user = new User({
        nombre : req.body.nombre,
        mail: req.body.mail,
        password: req.body.password
    });
    User.login(user, (err, data) => {
        if (err) {
          console.error("Error:", err);
        } else {
          // Puedes acceder al token y al código de estado
          const { token, status } = data;
          if (status === 200) {
            //callback(null, { status: 200, message: "Inicio de sesión exitoso", token: token });   
                   
            res.send({ token: token, status: 200, message: "Inicio de sesión exitoso" });
          } else {
            console.log("Mensaje de error:", data.message);
          }
        }
      });

}

exports.cerrarSesion = (idUser, res) =>{
    User.cerrarSesion(idUser, (err, data)=>{
        if(err){
            console.log("error de cierre de sesion");
        }else{
            if(data){
                res.sendStatus(data);    
            }else{
             console.log("res es undefined: "+ data);
            }
        }
    });
}