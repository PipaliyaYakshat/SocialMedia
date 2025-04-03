var express = require('express');
var router = express.Router();
var CC = require('../contoller/comment')

router.post('/', CC.createData);
router.get('/find/:id', CC.oneComment)
router.get('/', CC.allComment)
router.patch('/:id', CC.updateComment)
router.delete('/:id', CC.deleteComment)


module.exports = router;
