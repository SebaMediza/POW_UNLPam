const User = require("../model/user.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
    const user = new User({
        nombre : req.body.nombre,
        email: req.body.email,
        password: req.body.password
    });
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "error al crear la torta."
            });
        else res.send(data);
    });

};

exports.inicioSesion = (req, res) =>{
    const user = new User({
        //nombre : req.body.nombre,
        email: req.body.email,
        password: req.body.password
    });
    User.inicioSesion(user,(err, data) => {
        if(data === 200){
            res.redirect('/home')
        }
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `usuario no encontrado`
                });
            } else {
                res.status(500).send({
                    message: "error al buscar nombre"
                });
            }
        } else res.sendStatus(data);
    });

}