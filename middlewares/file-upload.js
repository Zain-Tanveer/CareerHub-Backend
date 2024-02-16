const multer = require('multer')
const path = require('path')

const { BadRequestError } = require('../errors')

const maxSize = 4 * 1024 * 1024

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true)
  } else {
    cb(
      new BadRequestError('Image uploaded is not of type jpg/jpeg, png or pdf'),
      false
    )
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: fileFilter,
})

module.exports = upload
