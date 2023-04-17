const express= require('express');


const { getEmployeLogin } =require('../controllers/employes');


const router = express.Router();

router.post('/login/', getEmployeLogin);


module.exports = router;