const express= require('express');
const router = express.Router();
const { getAdmin } =require('../controllers/admin');
router.post('/', getAdmin);
/*
const admin = require("../models/employe")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/', async (req, res) => {
    try {
    let { NomPrenom, MotPasse } = req.body
    if (!NomPrenom || !MotPasse) {
        return res.status(404).send({ success: false, message: "All fields are required" })
        }
        let admin = await admin.findOne({ NomPrenom
        }).select('+MotPasse')
        if (!admin) {
        return res.status(404).send({ success: false, message: "Account  doesn't exists" })
        } else {
        let isCorrectMotPasse = await bcrypt.compare(MotPasse, admin.MotPasse)
        if (isCorrectMotPasse) {
        delete admin._doc.MotPasse
        const token = jwt.sign ({ idadmin:
        admin._id,name:admin.firstname, role: admin.role }, process.env.SECRET, {
        expiresIn: "1h", })
        return res.status(200).send({ success: true, admin, token })
        } else {
        return res.status(404).send({ success: false, message:
        "Please verify your credentials" })
    }
}
} catch (err) {
return res.status(404).send({ success: false, message: err.message
})
}
});
 */

module.exports = router;