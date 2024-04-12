const express= require('express');
const router = express.Router();
const { getCategories , createCategorie , updateCategorie , deleteCategorie} =require('../controllers/categories');

router.get('/', getCategories);
router.post('/', createCategorie);
router.put('/:CodeCat' , updateCategorie);
router.delete('/:CodeCat', deleteCategorie);

module.exports = router;





