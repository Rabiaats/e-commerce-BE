"use strict"

const router = require('express').Router()

const { list, paymentStripe, paymentCOD, read, update, cancel, verifyStripe } = require('../controllers/order');

const {isAdmin, isLogin} = require("../middlewares/permissions");


// URL: /categories
router.use(isLogin)

router.route('/')
    .get(list)
    .put(isAdmin,update)
    .patch(isAdmin,update)
    .delete(isAdmin,cancel);
    
router.route('/:id')
    .get(read)

    // payment
router.post('/cod', paymentCOD)
router.post('/stripe', paymentStripe)

// verify payment
// success = true/false url inden gittikten sonra yani paymentStripe den sonra success ve orderId params dan alinarak bu url e post atilir, header da token gonderilir
router.get('/verifyStripe', verifyStripe)


/* ------------------------------------------------------- */
module.exports = router;