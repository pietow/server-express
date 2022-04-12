/** @format */
;(function () {
    'use strict'

    module.exports = {
        getHash: getHash,
        compareHash: compareHash,
        ignorePassword: ignorePassword,
    }

    const PasswordService = require('../../helpers/password.helper')

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
                    res.send('Access denied!')
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
})()
