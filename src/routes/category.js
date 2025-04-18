"use strict"

const router = require('express').Router()

const { list, create, read, update, deletee } = require('../controllers/category');

const {isAdmin} = require("../middlewares/permissions");

// URL: /categories

router.route('/')
    .get(list)
    .post(isAdmin, create);

router.route('/:id')
    .get(isAdmin,read).put(isAdmin,update).patch(isAdmin,update).delete(isAdmin,deletee);

/* ------------------------------------------------------- */
module.exports = router;