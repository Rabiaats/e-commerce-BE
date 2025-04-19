"use strict"

const router = require('express').Router();

const { list, create, read, update, deletee } = require('../controllers/product');
const { isAdmin} = require('../middlewares/permissions');
const upload = require('../middlewares/upload');

router.get('/', list)
router.get('/:id', read)

// router.use(isAdmin);

router.post('/', upload.array('image') ,create)
    // buradaki image ile input name=image eslesmeli

router.route('/:id')
    .put(upload.array('image'), update)
    .patch(upload.array('image'), update)
    .delete(deletee)

module.exports = router;