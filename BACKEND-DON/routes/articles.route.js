const express = require('express');

//import  upload from '../middleware/uploadProvider.js';
const { getArticles, createArticle, deleteArticle, updateArticle, getArticleByID, deleteArticle2, getArticles2} = require('../controllers/articles');
const { uploadImg } = require("../middleware/multer")

const router = express.Router();
router.get('/', getArticles);
router.get('/articles', getArticles2);
router.post('/', uploadImg.single("imagepath"), createArticle);
router.get('/:CodeArt', getArticleByID);
router.post('/', createArticle);
router.put('/:CodeArt', uploadImg.single("imagepath"), updateArticle);
//router.put('/articles/:CodeArt', deleteArticle);
router.delete('/:CodeArt', deleteArticle2)

module.exports = router;
