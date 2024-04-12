const db = require('../models')
const getCategories = async (req, res) => {
    try {
        const cat = await db.sequelize.query(`select * from categorie ORDER BY CodeCat`);
        res.status(200).json(cat[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const createCategorie = async (req, res) => {
    const { CodeCat, DesCat, Image, visible_web } = req.body;
    try {
        const cat = await db.sequelize.query(`INSERT INTO categorie (DesCat, CodeCat, Image , visible_web) VALUES ("${DesCat}","${CodeCat}","${Image}" ,"${visible_web}")`);
        res.status(200).json(cat[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateCategorie = async (req, res) => {
    const { CodeCat, DesCat, Image, visible_web } = req.body;
    try {
        const cat = await db.sequelize.query(`UPDATE categorie SET DesCat = "${DesCat}", CodeCat = "${CodeCat}", Image ="${Image}",visible_web ="${visible_web}" WHERE  CodeCat = "${CodeCat}"`);
        res.json({ message: "category updated successfully!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteCategorie = async (req, res) => {
    const CodeCat = req.params.CodeCat;
    try {
        const associatedArticles = await db.sequelize.query(`SELECT CodeArt FROM article WHERE CodeCat = "${CodeCat}"`);

        if (associatedArticles[0].length > 0) {
            res.status(400).json({ message: "Category cannot be deleted due to associated articles." });
            return;
        }

        const deletedCat = await db.sequelize.query(`DELETE FROM categorie WHERE CodeCat = "${CodeCat}"`);
        
        if (deletedCat[0].affectedRows === 0) {
            res.status(404).json({ message: "Category not found." });
            return;
        }
        
        console.log("Category deleted successfully!");
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the category." });
    }
}

module.exports = { getCategories, createCategorie, updateCategorie , deleteCategorie };


