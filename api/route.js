// Initialize express router
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {API_PORT} = process.env;

const bcrypt = require("bcryptjs");



// Require user routes
const pelicula = require("./controllers/pelicula.controller.js");
const serie = require("./controllers/serie.controller.js");
const main = require('./controllers/main.controller.js')
const usuarios = require('./controllers/usuario-controller')
const auth = require("./middleware/auth");


// Initialize express router
const app = express();
const path = require('path');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
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
  console.log("campo seteado en el header es: " + miCampo);
  
  // Continúa con el siguiente middleware o manejador de ruta
  next();
});


app.get('/', main.auth);

app.get('/home', auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    main.home
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});


//Todo lo referido a peliculas
app.post("/peliculas", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.create 
  }else{
    console.log("error no es posible acceder a esta ruta: "+  res.status);
  }
});

//ruta para listar las peliculas
app.get("/peliculas", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.list 
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
//ruta para buscar una pelicula por id
app.get("/peliculas/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.getId
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
//ruta para actualizar una pelicula por su id
app.post("/peliculas/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.update
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
//ruta para eliminar una pelicula por su id
app.delete("/peliculas/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.delete
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
//ruta para eliminar todas las peliculas de la bd
app.delete("/peliculas", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.deleteAll
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});

//Todo lo referido a series
app.post("/series", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.create
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
app.get("/series", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.list
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
app.get("/series/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.getId 
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
app.post("/series/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.update
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
app.delete("/series/:id", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.delete
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});
app.delete("/series", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.deleteAll
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});


app.get("/genero", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    pelicula.searchByGender
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});

app.get("/genero", auth,(req, res)=>{
  if (res && res.statusCode === 200) {
    serie.searchByGender
  }else{
    console.log("error no es posible ir a la home dado que no ha iniciado sesion: "+  res.status);
  }
});


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
app.get("/solologueado", auth,(req, res) => {
  res.json({ message: "Hola soy la api de node" });
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
const PORT = process.env.PORT || API_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});