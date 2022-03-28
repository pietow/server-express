/** @format */
;(function () {
    'use strict'

    module.exports = {
        getHash: getHash,
        compareHash: compareHash,
    }

    const PasswordService = require('../../helpers/password.helper')

    function getHash(req, res, next) {
        PasswordService.hash(req.body.password)
            .then((hash) => {
                req.body.password = hash
                next()
            })
            .catch((err) => next(`In HashMiddleware: ${err}`))
    }

    function compareHash(req, res, next) {
        PasswordService.compare(req.body.password, req.response.password)
            .then((isValid) => {
                if (!isValid) {
                    throw new Error('Access denied!')
                } else {
                    next()
                }
            })
            .catch((err) => next(err))
    }
})()
