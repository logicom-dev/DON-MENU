// Sequelize initialization
const Sequelize = require('sequelize');
//const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mech', 'logi', 'Logi-2020', {
  host: '41.226.12.27',
  dialect: 'mysql',
});

const express = require('express');
const router = express.Router();
const User = require("../models/adminuser")(sequelize, Sequelize);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// créer un nouvel utilisateur

router.post('/register', async (req, res) => {
    try {
        let { email, password, firstname, lastname } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const newUser = await User.create({ email, password, firstname, lastname });
        const createdUser = {
            id: newUser.id,
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname
        };

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: createdUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
/* router.post('/register', async (req, res) => {
    try {
        let { email, password, firstname, lastname } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(404).send({
            success: false, message:
                "User already exists"
        })
        const newUser = new User({ email, password, firstname, lastname })
        const createdUser = await newUser.save()
        return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })
    } catch (err) {
        console.log(err)
        res.status(404).send({ success: false, message: err })
    }
}); */
// afficher la liste des utilisateurs.
/* router.get('/', async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }); */
/**
* as an admin i can disable or enable an account
*/
/* router.get('/status/edit/', async (req, res) => {
    try {
        let email = req.query.email
        console.log(email)
        let user = await User.findOne({ email })
        user.isActive = !user.isActive
        user.save()
        res.status(200).send({ success: true, user })
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
}) */
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isActive: true // Add a condition here based on your requirements
      },
      attributes: ['email', 'firstname', 'lastname'],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// se connecter

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(404).send({ success: false, message: "Account doesn't exist" })
        } else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                delete user.password
                if (!user.isActive) return res.status(200).send({
                    success: false, message: 'Your account is inactive. Please contact your administrator'
                })
                const token = jwt.sign({
                    iduser: user._id, name: user.firstname, role: user.role
                }, process.env.SECRET, {
                    expiresIn: "1h",
                })
                return res.status(200).send({ success: true, user, token })
            } else {
                return res.status(404).send({
                    success: false, message:
                        "Please verify your credentials"
                })
            }
        }
    } catch (err) {
        return res.status(404).send({
            success: false, message: err.message
        })
    }
});

module.exports = router;