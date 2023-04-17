const express= require('express');


const { getAdminLogin } =require('../controllers/admin');


const router = express.Router();

router.post('/login/', getAdminLogin);


module.exports = router;