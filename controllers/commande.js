const db = require('../models');

const createCommande = async (req, res) => {
  const com_data = req.body;
  try {
    const cat = await db.sequelize.query(
      `INSERT INTO commande (com_data) VALUES (:comData)`,
      {
        replacements: {
          comData: JSON.stringify(com_data),
        },
      }
    );
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCommande = async (req, res) => {
  try {
    const commandes = await db.sequelize.query(`SELECT * FROM commande`);
    
    const modifiedCommandes =  commandes[0].map((commande) => {
      try {
        const modifiedCommande = JSON.parse(commande.com_data.replace(/\\/g, ''));
        commande.com_data = modifiedCommande;
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
      return commande;
    });
    res.status(200).json(modifiedCommandes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteCommande = async (req, res) => {
  const commandeId = req.params.id;
  try {
    await db.sequelize.query(`DELETE FROM commande WHERE id_cmd = :commandeId`, {
      replacements: {
        commandeId: commandeId,
      },
    });
    res.status(200).json({ message: "Commande deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports = { createCommande , getCommande , deleteCommande};
