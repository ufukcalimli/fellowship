const multer = require('multer')

const limits = {
    limits: {
        fileSize: 1024 * 1024 * 5  // 5 mb 
    }
}

const fileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

module.exports = {
    multerStorage,
    fileFilter,
    limits
}