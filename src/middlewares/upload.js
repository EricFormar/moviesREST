const multer = require('multer');
const path = require('path');

const {messString} = require('../helpers')

const storage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, 'public/uploads')
    },
    filename : function (req,file,callback) {
        callback(null,`${messString(Date.now().toString(32))}_${file.fieldname}${path.extname(file.originalname)}`)
    }
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null,false,req.fileValidationError);
        }
    
        cb(null, true)
      }
});

module.exports = upload