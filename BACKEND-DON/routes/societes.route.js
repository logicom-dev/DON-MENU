const express= require('express');

//import  upload from '../middleware/uploadProvider.js';
const { getSocietes,getSocietesByCode} =require('../controllers/societes');


const router = express.Router();

router.get('/',getSocietes);
router.get('/:CodeSoc',getSocietesByCode);

module.exports = router;



