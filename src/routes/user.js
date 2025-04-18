"use strict"

const router = require('express').Router()

const { list, create, read, update, deletee, forgotPassword, changePassword } = require('../controllers/user');
const { isLogin, isAdmin} = require('../middlewares/permissions')
// URL: /users



router.route('/').get(isAdmin, list).post(create);

router.post('/forgotPassword', forgotPassword);
router.post('/changePassword', changePassword);

router.route('/:id').get(isLogin, read).put(isLogin, update).patch(isLogin, update).delete(isAdmin, deletee);

/* ------------------------------------------------------- */
module.exports = router;