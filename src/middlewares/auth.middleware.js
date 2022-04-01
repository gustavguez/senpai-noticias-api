const jwt = require("jsonwebtoken");
const JWT_SECRET = "senpaiacademy";

const authMiddleware = (request, response, next) => {
  const token = request.header("Authorization");

  //Si no nos mandan un token error 401: acceso denegado
  if (!token) {
    return response.status(401).send({
      error: "¡Acceso denegado!",
    });
  }

  //Ver si el token es valido o no
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    //Cuando el token no es valido 400: invalido
    return response.status(400).send({
      error: "Token invalido!",
    });
  }
};

module.exports = { authMiddleware, JWT_SECRET };
