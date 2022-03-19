const path = require('path');
const multer = require('multer');


var storage = multer.diskStorage({
    destination:function(req,file,cb) {
        if(file.fieldname=='img[]' || 'vault_theme'){
            cb(null, 'public/uploads/vaults')       
        }else{
            cb(null, 'public/uploads/vehicles')       
        }
        
    },
    filename : function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

var upload = multer({
    storage:storage,
     imageFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)) {
            req.fileValidationError = 'Only image and video are allowed!';
            return cb(new Error('Only image and video are allowed!'), false);
        }
        cb(null, true);
    },
    limits:{
        fileSize: 1024 * 1024 * 3
    }
})
module.exports = upload




