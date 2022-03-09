const express = require("express");
const cors = require("cors");

//Info Fake
const noticias = [
  { id: 1, titulo: "La 1era guerra nueclear" },
  { id: 2, titulo: "La 2era guerra nueclear" },
  { id: 3, titulo: "La 3era guerra nueclear" },
  { id: 4, titulo: "La 4era guerra nueclear" },
];

//Creamos nuestra API
const api = express();

//Habilitamos CORS
api.use(cors());

// api.use("/*", (request, response, next) => {
//   console.log("ENTRO EN EL MIDDLEWARE");
//   response.send({ error: "No esta logged!" });
//   // next();
// });

//Configurar mi primer endpoint
api.get("/noticias-principales", (request, response) => {
  response.send(noticias);
});

api.get("/noticias-principales/:noticiaId", (request, response) => {
  let resultado = null;

  //Obtener el noticiaId de la ruta
  const noticiaId = request.params.noticiaId;

  //Buscar la noticia por ese noticiaId
  noticias.forEach((noticia) => {
    if (noticia.id == noticiaId) {
      resultado = noticia;
    }
  });

  //Validar que resultado no este vacío
  if (resultado === null) {
    response.statusCode = 404;
    response.send({
      error: "La noticia no existe!",
    });
    return;
  }
  //Responder con la noticia encontrada
  response.send(resultado);
});

api.get("/*", (request, response) => {
  //TODO: Mover status code a archivo separado
  response.statusCode = 404;
  response.send({
    mensaje: "¡La ruta no existe!",
  });
});

//Levantamos nuestra api y escuchamos el puerto que le digamos
api.listen(4000, () => {
  console.log("La API esta funcionando!");
});

//Listado de endpoints
//http:localhost:4000/noticias-principales
//http:localhost:4000/noticias-principales/1
//http:localhost:4000/noticias-principales/2
//http:localhost:4000/algo-que-no-existe
