"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const {addToCart, updateCart, getUserCart} = require('../controllers/cart');

router.route('/')
    .get(getUserCart)

router.route('/:id')
    .post(addToCart)
    .put(updateCart)

module.exports = router;