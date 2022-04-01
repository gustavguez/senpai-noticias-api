const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Requerir la palabra clave
const { JWT_SECRET } = require("./../middlewares/auth.middleware");

//Creamos el router
const authRouter = express.Router();

const usuarios = [
  {
    email: "hola@senpai.com",
    password: "$2b$10$ZJSov0lFNDKgz4Z4Ug0jT.Q6lXh6VkfpRCKhmbScRD2DnkK4nujBK",
  },
  {
    email: "chau@senpai.com",
    password: "passwordencriptadoamanogracias",
  },
];

authRouter.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  //Busco si hay un usuario con el correo envíado
  const usuario = usuarios.find((usarioBD) => {
    return usarioBD.email === email;
  });

  //Error si el usuario no existe
  if (!usuario) {
    return response.status(400).send({
      error: "¡Usuario no encontrado!",
    });
  }

  //Comparar si es la misma clave que nos mandaron desde la UI
  const esIgualPassword = await bcrypt.compare(password, usuario.password);
  if (!esIgualPassword) {
    return response.status(400).send({
      error: "¡La clave no es correcta!",
    });
  }

  //Generar un jwt ya que sabemos que el usuario es autenticado
  const token = jwt.sign(
    {
      email: usuario.email,
    },
    JWT_SECRET
  );

  //Login éxito el usuario existe y la clave es la misma
  response.send({
    error: null,
    mensage: "¡Login correcto!",
    token: token,
  });
});

module.exports = authRouter;
