/** @format */
;(function () {
    'use strict'

    module.exports = {
        getHash: getHash,
        compareHash: compareHash,
        ignorePassword: ignorePassword,
        signJWT: signJWT,
        authenticateJWT: authenticateJWT,
    }

    const PasswordService = require('../../helpers/password.helper')
    const jwt = require('jsonwebtoken')

    function getHash(req, res, next) {
        if (req.body.hasOwnProperty('password')) {
            PasswordService.hash(req.body.password)
                .then((hash) => {
                    req.body.password = hash
                    next()
                })
                .catch((err) => next(err))
        } else {
            throw new Error('Password required')
        }
    }

    function compareHash(req, res, next) {
        PasswordService.compare(req.body.password, req.response.password)
            .then((isValid) => {
                if (!isValid) {
                    throw new Error('Access denied!')
                } else {
                    req.isValid = isValid
                    next()
                }
            })
            .catch((err) => next(err))
    }

    function ignorePassword(req, res, next) {
        if (req.body.password) delete req.body.password
        next()
    }

    function signJWT(req, res, next) {
        const accessTokenSecret = process.env.SECRETJWT
        if (req.isValid) {
            const accessToken = jwt.sign(
                { username: req.response.username },
                accessTokenSecret,
            )
            req.response.token = accessToken
            next()
        } else {
            throw new Error(
                'Please include validation middleware: HashMiddleware.compareHash',
            )
        }
    }

    function authenticateJWT(req, res, next) {
        const accessTokenSecret = process.env.SECRETJWT
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return next(err)
                }
                next()
            })
        } else {
            throw Error('No authHeader')
        }
    }
})()
