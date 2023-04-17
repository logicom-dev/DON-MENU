const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorie', {
    CodeCat: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    DesCat: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Image: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    typecat: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "0"
    },
    sel: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'categorie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CodeCat" },
        ]
      },
      {
        name: "CodeCat",
        using: "BTREE",
        fields: [
          { name: "CodeCat" },
        ]
      },
    ]
  });
};
