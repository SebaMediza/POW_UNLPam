var fs = require('fs');
const Comentario = require('../model/comments.model.js');

exports.auth = (req, res) => {
    fs.readFile('./vistas/index.html', function(err, data) {
        if(err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}
exports.home = (req, res) => {
    fs.readFile('./vistas/home.html', function(err, data) {
        if(err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

exports.newComment = (req, res) =>{
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
    const comm = new Comentario({
       idContenido : req.body.idContenido,
       comentario : req.body.comentario
    });
    Comentario.newComment(comm, (err, data) =>{
        if (err)
            res.status(500).send({
                message: err.message || "error al crear el nuevo comentario."
            });
        else res.send(data);
    });

}

exports.verComment = (req, res) =>{
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
   
    Comentario.verComment(req.params.id, (err, data) =>{
        if (err)
            res.status(200).send({  
                message: data.message || "no hay comentarios."
            });
        else res.send(data);
    });
}