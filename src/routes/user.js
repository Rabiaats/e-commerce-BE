"use strict"

const router = require('express').Router()

const { list, create, read, update, deletee, forgotPassword, changePassword } = require('../controllers/user');
const { isLogin, isAdmin} = require('../middlewares/permissions')
// URL: /users

router.post('/forgotPassword', forgotPassword);

router.use(isLogin)

router.route('/').get(isAdmin, list).post(create);

router.post('/changePassword', changePassword);

router.route('/:id').get(read).put(update).patch(update).delete(isAdmin, deletee);

/* ------------------------------------------------------- */
module.exports = router;