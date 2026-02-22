const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Base uploads folder
const baseUploadPath = path.join(__dirname, "../uploads");

// Sub folders
const coverPath = path.join(baseUploadPath, "coverImage");
const mainPath = path.join(baseUploadPath, "mainImage");

// Create folders if not exists
[baseUploadPath, coverPath, mainPath].forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname === "coverImage") {
      cb(null, coverPath);
    } 
    else if (file.fieldname === "mainImage") {
      cb(null, mainPath);
    } 
    else {
      cb(null, baseUploadPath);
    }
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;