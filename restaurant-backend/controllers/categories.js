//const { categorie } = require('../models');
//const firebase = require('firebase-admin');
const db = require('../models')
//Categorie = db.categorie
const fs = require('fs');
/* const config = {
    apiKey: "AIzaSyDKxiDTfOFGuT6VS8mGZKJ_PBELm_OxTiI",
    authDomain: "mascotte-7a725.firebaseapp.com",
    projectId: "mascotte-7a725",
    storageBucket: "mascotte-7a725.appspot.com",
    messagingSenderId: "549318756211",
    appId: "1:549318756211:web:834f903605249f46f52706",
    measurementId: "G-D8ZK929WCM"

};
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: config.storageBucket
});
const storage = firebase.storage();
const bucket = storage.bucket();
const firestore = firebase.firestore(); */

/* //image Upload 

const multer =require('multer');

const path =require('path')

 */


const getCategories = async (req, res) => {
    try {
        const cat = await db.sequelize.query(`select CodeCat, DesCat, visible_web, Image from categorie where visible_web = "1"`);
      
        res.status(200).json(cat[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const GetCategorieById = async (req, res) => {
    const CodeCat = req.params.CodeCat;
    try {
        const cat = await db.sequelize.query(`SELECT DesCat, CodeCat, Image FROM categorie WHERE CodeCat=${CodeCat}`);
        console.log(cat);
        res.status(200).json(cat[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteCategorie2 = async (req, res) => {
    const CodeCat = req.params.CodeCat;
    console.log(CodeCat);
    try {

        const cat = await db.sequelize.query(`DELETE FROM categorie WHERE  CodeCat = "${CodeCat}"`);
        console.log(cat)
        res.json({ message: "category deleted successfully." });;
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createCategorie = async (req, res) => {
    const CodeCat = req.body.codecategorie;
    const DesCat = req.body.nomcategorie;
    //const Image = req.file.filename;
    const url = req.protocol + '://' + req.get('host')
    const Image = url + '/public/' + req.file.filename;

    try {

        const cat = await db.sequelize.query(`INSERT INTO categorie (DesCat, CodeCat, Image) VALUES ("${DesCat}","${CodeCat}","${Image}")`);
        console.log(cat);
        console.log("category added successfully !!");
        res.status(200).json(cat[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateCategorie = async (req, res) => {
    const CodeCat = req.body.CodeCat;
    const DesCat = req.body.DesCat;
    const url = req.protocol + '://' + req.get('host')
    const Image = url + '/public/' + req.file.filename;
    const path = Image;
    /*  fs.access(path, fs.constants.F_OK, (err) => {
         if (err) {
           console.error(`${path} does not exist or is not accessible`);
         } else {
           console.log(`${path} exists and is accessible`);
         }
       }); */
    try {

        const cat = await db.sequelize.query(`UPDATE categorie SET DesCat = "${DesCat}", CodeCat = "${CodeCat}", Image ="${Image}"  WHERE  CodeCat = "${CodeCat}"`);
        console.log(cat)
        res.json({ message: "category updated successfully!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const deleteCategorie = async (req, res) => {
    const CodeCat = req.params.CodeCat;
    try {

        const cat = await db.sequelize.query(`UPDATE categorie SET visible_web ="0" WHERE  CodeCat = "${CodeCat}"`);
        console.log(cat)
        res.json({ message: "category deleted successfully!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

module.exports = {
    createCategorie,
    updateCategorie,
    deleteCategorie,
    deleteCategorie2,
    getCategories,
    GetCategorieById

}
