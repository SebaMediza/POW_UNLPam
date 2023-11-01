const bcrypt = require('bcryptjs');
const sql = require("../db/db.js");


// constructor
const User = function (user) {
    this.nombre = user.nombre;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    // Encriptar la contraseña
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
            console.log("Error al encriptar la contraseña: ", err);
            result(err, null);
            return;
        }

        // Reemplazar la contraseña original con el hash en newUser
        newUser.password = hash;

        sql.query("INSERT INTO clientes SET ?", newUser, (err, res) => {
            if (err) {
                console.log("Error al crear el cliente: ", err);
                result(err, null);
                return;
            }
            console.log("Cliente creado: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    });
};




User.inicioSesion = async (user, res) => {
    const nombre = user.nombre;
    const password = user.password;

    await sql.query(`SELECT * FROM clientes WHERE nombre = '${nombre}'`, async (err, resSql) => {
        if (err) throw (err)
        if (resSql.length == 0) {
            res.status(404).send("usuario no encontrado");
        }
        else {
            const usuario = resSql[0];
           
            if (await bcrypt.compare(password, usuario.password)) {
                console.log("inicio de sesion correcto");
                //res(<error>, <data>)
                res(null, 200);

                //deberia ir a la pagina de inicio.
            } else {
                console.log("inicio incorrecto de sesion");
                res(500, null);
            }
            
        }//end of User exists i.e. results.length==0
        
    }) //end of connection.query()
    



};
module.exports = User;