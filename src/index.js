const express = require("express");
const cors = require("cors");

//Info Fake
const noticias = [
  { id: 1, titulo: "La 1era guerra nueclear" },
  { id: 2, titulo: "La 2era guerra nueclear" },
  { id: 3, titulo: "La 3era guerra nueclear" },
];

//Creamos nuestra API
const api = express();

//Habilitamos CORS
api.use(cors());

//Configurar mi primer endpoint
api.get("/noticias-principales", (req, res) => {
  res.send(noticias);
});

//Levantamos nuestra api y escuchamos el puerto que le digamos
api.listen(4000);
//http:localhost:4000/noticias-principales
