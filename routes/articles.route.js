const express = require('express');
const router = express.Router();
const { getArticles , createArticle , updateArticle ,  deleteArticle , getArticleByID} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.put('/:CodeArt' , updateArticle);
router.delete('/:CodeArt', deleteArticle);

router.get('/:CodeArt', getArticleByID);

module.exports = router;
