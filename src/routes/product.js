"use strict"

const router = require('express').Router();

const { list, create, read, update, deletee } = require('../controllers/product');
const { isAdmin} = require('../middlewares/permissions');

router.get('/', list)
router.get('/:id', read)

router.use(isAdmin);

router.post('/',create)
    // buradaki image ile input name=image eslesmeli

router.route('/:id')
    .put(update)
    .patch(update)
    .delete(deletee)

module.exports = router;