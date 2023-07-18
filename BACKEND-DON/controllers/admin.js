const db = require("../models");
const getAdmin = async (req, res) => {
  try {
    const NomPrenom = req.body.NomPrenom;
    const MotPasse = req.body.MotPasse
    const checkPassword = (data) => {
      console.log(data.MotPasse)
      if ((data.MotPasse).length > 0) {
        if (data.MotPasse === MotPasse) {
          res.json({
            status: 200,
            message: 'Login success'
          });
        } else {
          res.json({
            status: 400,
            message: 'Password not matched'
          });
        }
      } else {
        res.json({
          status: 400,
          message: 'User not exist'
        });
      }
    };
    const sql = `SELECT * FROM employe WHERE NomPrenom = ?`;
    const sql2 = `SELECT * FROM employe WHERE MotPasse = ?`;
    const [data] = await db.sequelize.query(sql, { replacements: [NomPrenom], type: db.sequelize.QueryTypes.SELECT });

    if (data.length === 0) {
      const [data1] = await db.sequelize.query(sql2, { replacements: [MotPasse], type: db.sequelize.QueryTypes.SELECT });

      if (data1.length === 0) {
        res.json({
          status: 400,
          message: 'User does not exist'
        });
      } else {
        checkPassword(data1);
      }
    } else {
      checkPassword(data);
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error.message || 'Internal server error'
    });
  }
};

module.exports = {
  getAdmin
};