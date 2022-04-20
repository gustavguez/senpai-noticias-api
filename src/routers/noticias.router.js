const express = require("express");
const db = require("../configs/db");
const Noticia = require("../models/noticia");

const noticiasRouter = express.Router();

//Requerir el middlware de auth
const { authMiddleware } = require("./../middlewares/auth.middleware");

//Configurar el get
noticiasRouter.get("/", async (request, response) => {
  // const respuesta = await db.query("select * from noticias");
  // const noticias = respuesta.rows;
  const noticias = await Noticia.findAll();
  response.send(noticias);
});

//Configuro el get de una
noticiasRouter.get(
  "/:noticiaId",
  /*authMiddleware,*/ async (request, response) => {
    //Obtener el noticiaId de la ruta
    const noticiaId = request.params.noticiaId;
    // const respuesta = await db.query("select * from noticiass where id=$1", [noticiaId]);
    // const resultado = respuesta.rows[0];
    const resultado = await Noticia.findOne({
      where: {
        id: noticiaId,
      },
    });

    //Validar que resultado no este vacío
    if (!resultado) {
      response.statusCode = 404;
      response.send({
        error: "La noticia no existe!",
      });
      return;
    }
    //Responder con la noticia encontrada
    response.send(resultado);
  }
);

module.exports = noticiasRouter;
