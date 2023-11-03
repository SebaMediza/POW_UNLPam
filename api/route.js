const express = require("express");
const cors = require("cors");
const user = require('./controllers/user.controller.js');
const pelicula = require("./controllers/pelicula.controller.js");
const serie = require("./controllers/serie.controller.js");
const main = require('./controllers/main.controller.js')
const app = express();
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/',main.auth);

//ruta para crear torta, al ser una por get y otra por post son diferentes
app.post("/registro", user.create);

//ruta para chequear datos de inicio de sesion
app.post("/inicioSesion", user.inicioSesion);

app.get('/home', main.home);

//Todo lo referido a peliculas
app.post("/peliculas", pelicula.create);
app.get("/peliculas", pelicula.list);
app.get("/peliculas/:id", pelicula.getId);
app.post("/peliculas/:id", pelicula.update);
app.delete("/peliculas/:id", pelicula.delete);
app.delete("/peliculas", pelicula.deleteAll);

//Todo lo referido a series
app.post("/series", serie.create);
app.get("/series", serie.list);
app.get("/series/:id", serie.getId);
app.post("/series/:id", serie.update);
app.delete("/series/:id", serie.delete);
app.delete("/series", serie.deleteAll);

// set port, listen for requests
const PORT = process.env.PORT || 7071;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});