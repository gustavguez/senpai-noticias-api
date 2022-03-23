const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const log = require("./utils");

log();

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

//Creamos nuestra API
const api = express();

//Configuramos multer
const uploadMiddleware = multer({ dest: path.join("public", "uploads") });

//Habilitamos acceso a las imagenes en public/uploads
api.use(express.static(path.join(__dirname, "..", "public")));

//Habilitamos CORS y Middlewares externos
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//Middleware
api.use((request, response, next) => {
  //CODE - LOGGER: para guardar la url y la fecha
  const content = `Se entro a la ruta ${request.path} a las ${new Date()}\n`;
  fs.writeFile("./data/log.txt", content, { flag: "a+" }, () => {
    //Do nothing!
  });
  next();
});

//Un enpoint para acceder a las imagenes de mi api
// api.get("/uploads/:filename", (request, response) => {
//   const filename = request.params.filename;
//   const rutaImagen = path.join(__dirname, "..", "public", "uploads", filename);
//   //Controlar el acceso a la imagen
//   if (filename === "angular.png") {
//     response.statusCode = 400;
//     response.send("No tienes acceso a esta imagen");
//   }
//   response.sendFile(rutaImagen);
// });

//Configurar mi primer endpoint
api.get("/noticias-principales", (request, response) => {
  let size = request.query.size;

  if (size == undefined) {
    size = 8;
  }
  response.send(noticias.slice(0, size));
});

api.get("/mi-error", (request, response) => {
  // try {
  let miObjeto; //BD / FILE / SOURCE

  console.log(miObjeto.name);
  response.send("OK");
  // } catch (error) {
  //   response.statusCode = 400;
  //   response.send("Ocurrió un error!");
  // }
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

api.post("/contact", uploadMiddleware.single("foto"), function (request, response) {
  const datos = request.body;
  const foto = request.file;
  console.log(datos, foto);
  response.send({ message: "OK!" });
});

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

//Listado de endpoints
//http:localhost:4000/noticias-principales
//http:localhost:4000/noticias-principales/1
//http:localhost:4000/noticias-principales/2
//http:localhost:4000/algo-que-no-existe
