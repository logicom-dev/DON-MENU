const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employe', {
    CodeEmp: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    NomPrenom: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Adresse: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Contact: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Tel: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Fonction: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Login: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    MotPasse: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    caisse1: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    caisse2: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    caisse3: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    caisse4: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    caisse5: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    caisse9: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    czone: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    offmdp: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    dallas: {
      type: DataTypes.STRING(18),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CodeEmp" },
        ]
      },
      {
        name: "CodeEmp",
        using: "BTREE",
        fields: [
          { name: "CodeEmp" },
        ]
      },
    ]
  });
};
