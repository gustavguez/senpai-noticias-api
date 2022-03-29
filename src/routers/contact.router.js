const express = require("express");
const multer = require("multer");
const path = require("path");
const contactRouter = express.Router();

//Configuramos multer
const uploadMiddleware = multer({ dest: path.join("public", "uploads") });

//Configurar ruta para mandar contacto
contactRouter.post("/send", uploadMiddleware.single("foto"), function (request, response) {
  const datos = request.body;
  const foto = request.file;
  console.log(datos, foto);
  response.send({ message: "OK!" });
});
module.exports = contactRouter;
