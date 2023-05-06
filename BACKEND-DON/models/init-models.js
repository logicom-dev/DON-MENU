var DataTypes = require("sequelize").DataTypes;


var _article = require("./article");
var _categorie = require("./categorie");



function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);

  var categorie = _categorie(sequelize, DataTypes);
 

  return {
    article,
    categorie,
    
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
