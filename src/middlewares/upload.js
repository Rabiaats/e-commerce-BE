"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// app.use(upload.array('fieldName'))

const multer = require('multer');
const path = require("node:path");

module.exports = multer({
    storage: multer.diskStorage({
        destination: './upload/',
        filename: function(req, file, returnCallback) {
            returnCallback(null, file.originalname)
        }
    }),
    fileFilter: function (req, file, returnCallback) {
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const fileExtension = path.extname(file.originalname).toLowerCase();
    
        if (allowedExtensions.includes(fileExtension)) {
          returnCallback(null, true);
        } else {
          returnCallback(
            new Error("Just upload .jpg, .jpeg ve .png files!"),
            false
          );
        }
    },
})