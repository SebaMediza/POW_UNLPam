const sql = require("../db/db.js");

const Serie = function (serie) {
    this.titulo = serie.titulo,
    this.descripcion = serie.descripcion,
    this.fecha_lanzamiento = serie.fecha_lanzamiento,
    this.temporadas = serie.temporadas,
    this.director = serie.director,
    this.genero = serie.genero,
    this.urlSerie = serie.urlSerie,
    this.image = serie.image
};


Serie.create = (newSerie, result) => {
    sql.query("INSERT INTO serie SET ?", newSerie, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Serie creada: ", { id: res.insertId, ...newSerie });
        result(null, { id: res.insertId, ...newSerie });
    })
};

Serie.findById = (id, result) => {
    sql.query(`SELECT * FROM serie WHERE idSerie = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("serie encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not-found" }, null);
    });
};

Serie.getAll = (result) => {
    let query = "SELECT * FROM serie";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("serie: ", res);
        result(null, res);
    });
};

Serie.updateById = (id, serie, result) => {

    let updateQuery = "UPDATE serie SET ";
    let updateData = [];
    let updateValues = [];

    for (const key in serie) {
        if (serie[key] !== undefined) {
            updateValues.push(`${key} = ?`);
            updateData.push(serie[key]);
        };
    };

    updateQuery += updateValues.join(", ");
    updateQuery += " WHERE idSerie = ? ";
    updateData.push(id);

    sql.query(
        //"UPDATE serie SET titulo=?, descripcion=?, fecha_lanzamiento=?, duracion=?, director=?, genero=? WHERE idMovie = ?",
        //[serie.titulo, serie.descripcion, serie.fecha_lanzamiento, serie.duracion, serie.director, serie.genero, id],
        updateQuery, updateData,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("serie actualizada: ", { id: id, ...serie });
            result(null, { id: id, ...serie });
        }
    );

}

Serie.remove = (id, result) => {
    sql.query("DELETE FROM serie WHERE idSerie = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not found" }, null);
            return;
        }
        console.log("serie borrada id: ", id);
        result(null, res);
    });
}

Serie.removeAll = result => {
    sql.query("DELETE FROM serie", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} serie`)
        result(null, res);
    });

}

module.exports = Serie;