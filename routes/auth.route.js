const express= require('express');
const router = express.Router();
const { getAuth , createAdmin} =require('../controllers/auth');
router.post('/auth', getAuth)
router.post('/addAdmin', createAdmin)

module.exports = router;