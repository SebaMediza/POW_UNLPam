const sql = require("../db/db.js");


const Comentario = function(comentario){
    this.idContenido = comentario.idContenido
    this.comentario = comentario.comentario
}

Comentario.newComment = (comm, result) =>{
    sql.query("INSERT INTO comentarios SET ?", comm, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Favorito creado: ", { id: res.insertId, ...comm });
        result(null, { id: res.insertId, ...comm });
    })
}

Comentario.verComment = (idContenido, result) =>{
    sql.query(`SELECT * FROM comentarios WHERE idContenido = '${idContenido}'`, (err, data) => {
        if (err) {
            console.log("Error en la consulta SQL: " + err);
            result(500, err);
            return;
        }

        if (data.length > 0) {
            result(null, data);
        } else {
            console.log("No se encontraron comentarios.");
            result(404, "No se encontraron comentarios.");
        }
    })
}

module.exports = Comentario;