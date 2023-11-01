const express = require("express");
const cors = require("cors");
const controllers = require('./controllers/controller');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//ruta para crear torta, al ser una por get y otra por post son diferentes
app.post("/registro", controllers.create);

//ruta para chequear datos de inicio de sesion
app.get("/inicioSesion", controllers.inicioSesion);

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});