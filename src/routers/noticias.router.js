const express = require("express");
const noticiasRouter = express.Router();

//Info Fake
const noticias = [
  { id: 1, titulo: "La 1era guerra nueclear", image: "angular.png" },
  { id: 2, titulo: "La 2era guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 3, titulo: "La 3era guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 4, titulo: "La 4era guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 5, titulo: "La 5ta guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 6, titulo: "La 6ta guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 7, titulo: "La 7ma guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
  { id: 8, titulo: "La 8va guerra nueclear", image: "4f0cf8c323ee04886501f83aa4e98aad" },
];

//Configurar el get
noticiasRouter.get("/", (request, response) => {
  let size = request.query.size;

  if (size == undefined) {
    size = 4;
  }
  response.send(noticias.slice(0, size));
});

//Configuro el get de una
noticiasRouter.get("/:noticiaId", (request, response) => {
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

module.exports = noticiasRouter;
