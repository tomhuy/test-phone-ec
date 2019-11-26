var multer = require('multer');
var fs = require('fs');



// upload section 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = 'assets';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString() + file.originalname);
        const dotIndex = file.originalname.lastIndexOf('.');
        const fileExtension = file.originalname.substring(dotIndex + 1);
        cb(null, `${Date.now()}.${fileExtension}`)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports={upload}
