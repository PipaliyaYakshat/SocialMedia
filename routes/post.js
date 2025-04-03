var express = require('express');
var router = express.Router();
var PC = require('../contoller/post')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.filename)
  }
})

const upload = multer({ storage: storage })

router.post('/', upload.array('image', 2), PC.createData);
router.get('/find/:id', PC.onePost)
router.get('/', PC.allPost)
router.patch('/:id', PC.updatePost)
router.delete('/:id', PC.deletePost)


module.exports = router;
