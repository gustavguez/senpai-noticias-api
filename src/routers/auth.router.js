const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

const usuarios = [
  {
    email: "hola@senpai.com",
    password: "$2b$10$ZJSov0lFNDKgz4Z4Ug0jT.Q6lXh6VkfpRCKhmbScRD2DnkK4nujBK",
  },
];

authRouter.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const passwordAComparar = "$2b$10$ZJSov0lFNDKgz4Z4Ug0jT.Q6lXh6VkfpRCKhmbScRD2DnkK4nujBK";

  //Codigo para generar un hash con mi clave
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(password, salt);
  const esIgualPassword = await bcrypt.compare(password, passwordAComparar);

  response.send({
    login: esIgualPassword ? "OK" : "ERROR",
  });
});

module.exports = authRouter;
