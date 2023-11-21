const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {API_PORT} = process.env;


const usuarios = require('./controllers/usuario-controller')
const auth = require("./middleware/auth");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hola soy la api de node" });
});

//ruta para ir al registrase
app.post("/registro", usuarios.registro);

//ruta para iniciar sesion
app.post("/login", usuarios.login);

//ruta que se puede acceder si estas loguado
app.get("/logueados", auth,(req, res) => {
  
  res.json({ message: "Hola soy la api de node" });
});


//configura el header para que llegue el token desde la bd al middwere
app.use((req, res, next) => {
  
  // Configura el encabezado para permitir solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Origin', '*');

  // Configura el encabezado para permitir ciertos métodos HTTP
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Configura el encabezado para permitir ciertos encabezados en las solicitudes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Añade el encabezado necesario para la autenticación
  res.header('x-access-token', global.myAppToken);
  const miCampo = req.headers['x-access-token'];

  console.log("el campo del header queda: " + miCampo);
  // Continúa con el siguiente middleware o manejador de ruta
  next();
});


//ruta para cerrar sesion. Antes de poder cerrar sesion chequea si tiene token es decir si esta logeado.
app.get("/cerrarSesion",auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    usuarios.cerrarSesion(req.body.idUser, res);
  }else{
    console.log("error respondio mal"+  res.status);
  }
});


// set port, listen for requests
const PORT = process.env.PORT || API_PORT;  //SE ROMPIO AL CAMBIAR AL 8080 PARA USAR CON EL REACT VOLVER AL 80
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});