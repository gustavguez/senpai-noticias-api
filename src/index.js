const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Creamos nuestra API
const api = express();

//Requerir los routers
const noticiasRouter = require("./routers/noticias.router");
const contactRouter = require("./routers/contact.router");

//Requerimos los middlwares
const loggerMiddleware = require("./middlewares/logger.middleware");

//Habilitamos acceso a las imagenes en public/uploads
api.use(express.static(path.join(__dirname, "..", "public")));

//Habilitamos CORS y Middlewares externos
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//Middleware
api.use(loggerMiddleware);

//Usamos los routers
api.use("/noticias", noticiasRouter);
api.use("/contact", contactRouter);

api.get("/*", (request, response) => {
  //TODO: Mover status code a archivo separado
  response.statusCode = 404;
  response.send({
    mensaje: "¡La ruta no existe!",
  });
});

api.use((error, request, response, next) => {
  response.statusCode = 400;
  response.send("ERROR");
});

//Levantamos nuestra api y escuchamos el puerto que le digamos
api.listen(4000, () => {
  console.log("La API esta funcionando!");
});
