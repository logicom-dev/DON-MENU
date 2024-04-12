var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _categorie = require("./categorie");
var _commande = require("./commande");
var _employe = require("./employe");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var categorie = _categorie(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var employe = _employe(sequelize, DataTypes);


  return {     
    article,
    categorie,
    commande,
    employe, };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
