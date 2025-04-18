"use strict"

const router = require('express').Router()

// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))

// category
router.use('/categories', require('./category'))

// brand
router.use('/brands', require('./brand'))

// product
router.use('/products', require('./product'))

// order
router.use('/orders', require('./order'))

// size
router.use('/sizes', require('./size'));

// cart
router.use('/cart', require('./cart'));


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router