const bcrypt = require('bcryptjs');
const sql = require("../db/db.js");
//para generar token
const jwt = require("jsonwebtoken");
const {KEY_APP} = process.env;


// constructor
const User = function (user) {
  this.nombre = user.nombre;
  this.mail = user.mail;
  this.password = user.password;
};


User.login = async (user, res) => {
  const password = user.password;

console.log(user);
    await sql.query(`SELECT * FROM usuarios WHERE nombre = '${user.nombre}'`, async (err, resSql) => {
        if (err) throw (err)
            if (resSql.length == 0) {
                res.status(404).send("usuario no encontrado");
            }
            else {
                const usuario = resSql[0];
                if(await bcrypt.compare(password, usuario.password)){
                    //genera el token para el usuario con el id y el nombre
                    const token = jwt.sign({user_name: usuario.nombre},KEY_APP);
                    usuario.token = token;
                    //actualiza el usuario con el token correcto
                    sql.query(
                        "UPDATE usuarios SET token = ? WHERE nombre = ?",
                        [usuario.token, usuario.nombre],
                        (err, res) => {
                          if (err) {
                            console.log("error: ", err);
                          }
                          if (res.affectedRows == 0) {
                            result({ kind: "not_found" }, null);
                          }
                        }
                    );
                    res(null, 200);
                }


            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
}; 

User.registro = (user, result) => {
  //console.log(user);

  bcrypt.hash(user.password, 10, (err, mihash)=>{
    if (err) {
        console.log("Error al encriptar la contraseña: ", err);
        result(err, null);
        return;
    }

    // Reemplazar la contraseña original con el hash en newUser
    user.password = mihash;

    sql.query("INSERT INTO usuarios SET ?", user, (err, res) => {
        if (err) {
            console.log("Error al crear el nuevo usario: ", err);
            result(err, null);
            return;
        }
        console.log("Usuario creado: ", { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
    });

  });
  
};

module.exports = User;