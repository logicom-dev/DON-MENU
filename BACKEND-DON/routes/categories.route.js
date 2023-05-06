const express= require('express');

const {getCategories,createCategorie, deleteCategorie, updateCategorie, GetCategorieById, deleteCategorie2} =require('../controllers/categories');
const {uploadImg} =require("../middleware/multer")

const router = express.Router();

router.get('/',getCategories);

router.post('/', uploadImg.single("Image"),createCategorie);

router.get('/:CodeCat', GetCategorieById);
//router.post('/',createCategorie);
router.put('/:CodeCat',uploadImg.single("Image"), updateCategorie);
//router.put('/categorie/:CodeCat', deleteCategorie);
router.delete('/:CodeCat', deleteCategorie2);


module.exports = router;





