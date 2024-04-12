const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorie', {
    CodeCat: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    },
    coule: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "0"
    },
    caisse1: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    caisse2: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    caisse3: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    caisse4: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    caisse5: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    visible_web: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 1
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
