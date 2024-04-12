const db = require("../models");


const getArticles = async (req, res) => {
    try {
        const art = await db.sequelize.query(`select * from article`);

        res.status(200).json(art[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createArticle = async (req, res) => {
    const { CodeCat, Descrip, LibArt, prix1, CodeArt, image_web , visible_web } = req.body;
    try {

        const art = await db.sequelize.query(`INSERT INTO article (CodeCat, Descrip, LibArt, prix1, CodeArt, visible_web, image_web) VALUES ("${CodeCat}","${Descrip}","${LibArt}","${prix1}","${CodeArt}","${visible_web}","${image_web}")`);
        console.log("article added successfully !!");
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateArticle = async (req, res) => {
    const { CodeArt, CodeCat, Descrip, LibArt, prix1, image_web, visible_web } = req.body;
    try {
        const cat = await db.sequelize.query(`UPDATE article SET Descrip ="${Descrip}", LibArt = "${LibArt}", prix1 ="${prix1}", CodeCat = "${CodeCat}", image_web = "${image_web}", visible_web = "${visible_web}"  WHERE  CodeArt = "${CodeArt}"`);
        res.json({ message: "article updated successfully!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const deleteArticle = async (req, res) => {
    const CodeArt = req.params.CodeArt;
    try {
        await db.sequelize.query(`DELETE FROM article WHERE CodeArt = "${CodeArt}"`);
        res.json({ message: "article deleted successfully!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getArticleByID = async (req, res) => {
    const CodeCat = req.params.CodeArt;
    try {
        const articles = await db.sequelize.query(`SELECT * FROM article WHERE CodeCat=${CodeCat}`);
        res.status(200).json(articles[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { getArticles , createArticle , updateArticle , deleteArticle , getArticleByID}
