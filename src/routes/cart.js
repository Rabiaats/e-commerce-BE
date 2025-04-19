"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const {addToCart, removeFromCart, updateCart, getUserCart} = require('../controllers/cart');

router.route('/')
    .get(getUserCart)
    .post(removeFromCart)
    .put(updateCart)

router.route('/:id')
    .post(addToCart)

module.exports = router;