const bcrypt = require('bcryptjs');
const sql = require("../db/db.js");
//para generar token
const jwt = require("jsonwebtoken");
const { KEY_APP } = process.env;


// constructor
const User = function (user) {
  this.nombre = user.nombre;
  this.email = user.email;
  this.password = user.password;
  this.token = user.token;
};


User.login = async (user, res) => {
  const password = user.password;
  const userToken = user.token;
  console.log(userToken);
  await sql.query(`SELECT * FROM clientes WHERE nombre = '${user.nombre}'`, async (err, resSql) => {
    if (err) throw (err)
    if (resSql.length == 0) {
      res.status(404).send("usuario no encontrado");
    }
    else {
      const usuario = resSql[0];
      if (await bcrypt.compare(password, usuario.password)) {
        //genera el token para el usuario con el id y el nombre
        const token = jwt.sign({ user_name: usuario.nombre }, 'llave');
        usuario.token = token;
        console.log(usuario.token);
        
        //actualiza el usuario con el token correcto
        if(user.token != usuario.token){
          sql.query(
            "UPDATE clientes SET token = ? WHERE nombre = ?",
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
        }
        console.log("Usuario logeado: ", { id: res.insertId, ...user });
        res(null, 200);
      }


    }//end of User exists i.e. results.length==0
  }) //end of connection.query()
};

User.registro = (user, result) => {
  //console.log(user);

  bcrypt.hash(user.password, 10, (err, mihash) => {
    if (err) {
      console.log("Error al encriptar la contraseña: ", err);
      result(err, null);
      return;
    }
    const token = jwt.sign({ user_name: user.nombre }, 'llave');
    user.token = token;
    console.log(user.token);
    // Reemplazar la contraseña original con el hash en newUser
    user.password = mihash;

    sql.query("INSERT INTO clientes SET ?", user, (err, res) => {
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