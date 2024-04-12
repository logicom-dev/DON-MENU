const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    CodeArt: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    LibArt: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Descrip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CodeCat: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sel: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    DesignImp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DureePrep: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    QteStk: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    LibArt2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LibArt3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LibArt4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chemin: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    abrev: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    abrevpart1: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    abrevpart2: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    codedest: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    dispo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    qte_art_dec: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    unite: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    nbrunite: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1
    },
    vente_vrac: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0"
    },
    prix1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    prix2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    tauxtva: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    nbrmingarn: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    typeSTK: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "-1"
    },
    artfact: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    },
    ddeb: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    dfin: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2020-01-01"
    },
    hdeb: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "06:00"
    },
    hfin: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "06:00"
    },
    affectptfid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    datprom1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    datprom2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    affectptfids: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    affectptfida: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nbreptfid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    tauxpromo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    montantpromo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0
    },
    codefournmp: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },
    libefournmp: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    imagepath: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    imagesize: {
      type: DataTypes.MEDIUMINT,
      allowNull: true
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    couleur2: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    visible_web: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    image_web: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CodeArt" },
        ]
      },
      {
        name: "CodeArt",
        using: "BTREE",
        fields: [
          { name: "CodeArt" },
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
