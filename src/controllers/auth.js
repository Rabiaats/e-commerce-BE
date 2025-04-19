"use strict"

const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    login: async (req, res) => {
        /*
           #swagger.tags = ["Authentication"]
           #swagger.summary = "Login"
           #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
           #swagger.parameters["body"] = {
               in: "body",
               required: true,
               schema: {
                   "email": "test",
                   "password": "1234",
               }
           }
       */

        const { email, password } = req.body

        if (!((email) && password)) {
            res.errorStatusCode = 401;
            throw new Error('Please enter username/email and password.');
        }

        const user = await User.findOne({email: email})

        if ((!user & user.password !== passwordEncrypt(password))) {
            res.errorStatusCode = 401
            throw new Error('Wrong username/email or password.')
        }

        if (!user.isActive) {
            res.errorStatusCode = 401;
            throw new Error('This account is not active.')
        }

        /* Simple Token */
        let tokenData = await Token.findOne({ userId: user._id })
        if (!tokenData) {
            tokenData = await Token.create({
                userId: user._id,
                token: passwordEncrypt(user._id + Date.now())
            })
        }

        /* JWT */
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXP })
        const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: process.env.REFRESH_EXP })

        res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: { accessToken, refreshToken },
            user
        })


    },
    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */

        const { refreshToken } = req.body.bearer

        if (!refreshToken) {
            res.errorStatusCode = 404;
            throw new Error('Please enter your refresh token.')
        }

        jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

            if (err) {
                res.errorStatusCode = 401;
                throw err
            }

            const { _id, password } = userData


            const user = await User.findOne({ _id })

            if (!user && user.password !== password) {
                res.errorStatusCode = 401;
                throw new Error('Wrong password or id.')
            }

            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXP })

            res.status(200).send({
                error: false,
                bearer: { accessToken }
            })

        })

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */

        const auth = req.headers?.authorization || null //* Token tokenKey

        const tokenKey = auth ? auth.split(' ') : null  //* ['Token', 'tokenKey']

        let message = 'No need any process for logout. You must delete JWT tokens.', result;

        if (tokenKey && tokenKey[0] === "Token") { // simple token

            result = await Token.deleteOne({ token: tokenKey[1] })
            message = 'Token Deleted. Logout is success.'
        }

        req.session.cart = [];

        res.send({
            error: false,
            message,
            result
        })

    },
}
