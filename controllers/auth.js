const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const getAuth = async (req, res) => {
  try {
    const { NomPrenom, MotPasse } = req.body;
    const sql = `
      SELECT * 
      FROM employe 
      WHERE NomPrenom = ? 
        AND MotPasse = ? `;
    
    const [userData] = await db.sequelize.query(sql, {
      replacements: [NomPrenom, MotPasse],
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (userData) {
      const payload = { id: userData.CodeEmp, NomPrenom: userData.NomPrenom };
      const secretKey = process.env.secretKey;
      const token = jwt.sign(payload, secretKey, { expiresIn: '8h' });
      res.json({
        status: 200,
        message: 'Connexion réussie',
        mas_token: token,
      });
    } else {
      res.json({
        status: 400,
        message: 'Identifiants incorrects',
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || 'Internal server error',
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { NomPrenom, MotPasse } = req.body;

    const existingUser = await db.sequelize.query(
      'SELECT * FROM employe WHERE NomPrenom = ?',
      {
        replacements: [NomPrenom],
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      res.json({
        status: 400,
        message: 'User already exists',
      });
      return;
    }

    const newCodeEmp = uuidv4(); // Generate a new UUID as the primary key

    const insertSql = `
      INSERT INTO employe (CodeEmp, NomPrenom, MotPasse) 
      VALUES (?, ?, SHA2(?, 256))`;

    await db.sequelize.query(insertSql, {
      replacements: [newCodeEmp, NomPrenom, MotPasse],
      type: db.sequelize.QueryTypes.INSERT,
    });

    res.json({
      status: 200,
      message: 'User created successfully',
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = { getAuth, createAdmin };
