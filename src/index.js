const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Levantar variables de entorno
require("dotenv").config();

//Creamos nuestra API
const api = express();

//Requerir los routers
const authRouter = require("./routers/auth.router");
const noticiasRouter = require("./routers/noticias.router");
const contactRouter = require("./routers/contact.router");

//Requerimos los middlwares
const loggerMiddleware = require("./middlewares/logger.middleware");
const notFoundMiddleware = require("./middlewares/not-found.middleware");
const errorsMiddleware = require("./middlewares/errors.middlware");

//Habilitamos acceso a las imagenes en public/uploads
api.use(express.static(path.join(__dirname, "..", "public")));

//Habilitamos CORS y Middlewares externos
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//Middlewares
api.use(loggerMiddleware);

//Usamos los routers
api.use("/noticias", noticiasRouter);
api.use("/contact", contactRouter);
api.use("/auth", authRouter);

//Middlewares
api.all("/*", notFoundMiddleware);
api.use(errorsMiddleware);

//Levantamos nuestra api y escuchamos el puerto que le digamos
api.listen(4000, () => {
  console.log("La API esta funcionando!");
});
