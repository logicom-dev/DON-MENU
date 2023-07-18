const express= require('express');
const router = express.Router();
const {createCommande , getCommande} =require('../controllers/commande');


router.get('/',getCommande);
router.post('/' , createCommande );

module.exports = router;