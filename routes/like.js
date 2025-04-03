var express = require('express');
var router = express.Router();
var LC = require('../contoller/like')

router.post('/', LC.createData);
router.get('/find/:id', LC.oneLike)
router.get('/', LC.allLike)
router.patch('/:id', LC.updateLike)
router.delete('/:id', LC.deleteLike)


module.exports = router;
