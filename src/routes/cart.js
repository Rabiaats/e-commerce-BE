"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const {addToCart, updateCart, getUserCart} = require('../controllers/cart');

const {isLogin} = require('../middlewares/permissions');

router.route('/')
    .post(addToCart)

router.route('/:id')
    .get(isLogin, getUserCart)
    .put(updateCart)

module.exports = router;