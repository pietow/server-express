/** @format */
;(function () {
    'use strict'

    const PasswordService = require('../../helpers/password.helper')

    const getHash = (req, res, next) => {
        PasswordService.hash(req.body.password)
            .then((hash) => {
                req.body.password = hash
                next()
            })
            .catch((err) => next(`In HashMiddleware: ${err}`))
    }
    module.exports = {
        getHash: getHash,
    }
})()
