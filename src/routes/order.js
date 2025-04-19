"use strict"

const router = require('express').Router()

const { list, paymentStripe, paymentCOD, read, update, cancel, verifyStripe } = require('../controllers/order');

const {isAdmin, isLogin} = require("../middlewares/permissions");


// URL: /categories
router.use(isLogin)

router.get('/',list)
    
// payment
router.post('/cod', paymentCOD)
router.post('/stripe', paymentStripe)

// verify payment
// success = true/false url inden gittikten sonra yani paymentStripe den sonra success ve orderId params dan alinarak bu url e post atilir, header da token gonderilir
router.post('/verifyStripe', verifyStripe)

router.route('/:id')
    .get(read).put(isAdmin,update).patch(isAdmin,update).delete(cancel);

/* ------------------------------------------------------- */
module.exports = router;