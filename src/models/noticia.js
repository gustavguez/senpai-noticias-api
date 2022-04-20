const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Noticia = db.define(
  "noticias",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
module.exports = Noticia;
