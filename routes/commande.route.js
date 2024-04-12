const express= require('express');
const router = express.Router();
const {createCommande , getCommande , deleteCommande} =require('../controllers/commande');


router.get('/',getCommande);
router.post('/' , createCommande );
router.delete('/:id', deleteCommande);

module.exports = router;