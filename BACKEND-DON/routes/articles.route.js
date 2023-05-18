const express = require('express');
const { article } = require('../models/article');
const db = require("../models/article");
const Article = db.article;

//import  upload from '../middleware/uploadProvider.js';
const { getArticles, createArticle, deleteArticle, updateArticle, getArticleByID, deleteArticle2, getArticles2} = require('../controllers/articles');
const { uploadImg } = require("../middleware/multer")

const router = express.Router();

const {verifyToken} =require("../middleware/verify-token")
// afficher la liste des articles.
router.get('/', verifyToken, async (req, res )=> {
try {
    const art = await db.sequelize.query(`select CodeArt, LibArt, Descrip, CodeCat, prix1, image_web, visible_web from article `);

    res.status(200).json(art[0]);
} catch (error) {
res.status(404).json({ message: error.message });
}
}, getArticles);

//router.get('/', getArticles);
router.get('/articles', getArticles2);
router.post('/', uploadImg.single("imagepath"), createArticle);
router.get('/:CodeArt', getArticleByID);
router.post('/', createArticle);
router.put('/:CodeArt', uploadImg.single("imagepath"), updateArticle);
//router.put('/articles/:CodeArt', deleteArticle);
router.delete('/:CodeArt', deleteArticle2);

module.exports = router;
