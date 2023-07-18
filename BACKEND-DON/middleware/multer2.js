const multer2 = require("multer");
const fs = require("fs");

var DIR = './public2/';
if (!fs.existsSync(DIR)) { // CREATE DIRECTORY IF NOT FOUND
fs.mkdirSync(DIR, { recursive: true });
}
const storage2 = multer2.diskStorage({
destination: (req, file, callback) => {
callback(null, DIR);
},
filename: (req, file, callback) => {
const name = file.originalname.split(' ').join('_');
callback(null, name);
}
});
const uploadImg2 = multer2({
storage2: storage2
});


module.exports = {
    uploadImg2
}