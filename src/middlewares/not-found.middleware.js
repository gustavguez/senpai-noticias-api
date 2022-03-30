const notFoundMiddleware = (request, response) => {
  response.statusCode = 404;
  response.send({
    mensaje: "¡La ruta no existe!",
  });
};

module.exports = notFoundMiddleware;
