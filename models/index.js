const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const model=require("./init-models").initModels
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  
  operatorsAliases: 0, // change this to zero

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.sequelize= sequelize;
db.categorie = model(sequelize).categorie;
db.article=model(sequelize).article;
db.employe=model(sequelize).employe;
db.commande=model(sequelize).commande;

module.exports = db;




