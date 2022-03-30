const errorsMiddleware = (error, request, response, next) => {
  response.statusCode = 400;
  response.send("ERROR");
};

module.exports = errorsMiddleware;
