const fs = require("fs");

const loggerMiddleware = (request, response, next) => {
  //CODE - LOGGER: para guardar la url y la fecha
  const content = `Se entro a la ruta ${request.path} a las ${new Date()}\n`;
  fs.writeFile("./data/log.txt", content, { flag: "a+" }, () => {
    //Do nothing!
  });
  next();
};
module.exports = loggerMiddleware;
