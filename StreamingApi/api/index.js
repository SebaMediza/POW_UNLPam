const express = require("express");
const cors = require("cors");

const app = express();

const pelicula = require("./controllers/pelicula.controller.js");
const serie = require("./controllers/serie.controller.js");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Desde chico me ponian tu casaca con un fierro en la cinturaAaaAa." });
  });

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

