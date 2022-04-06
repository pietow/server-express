/** @format */

;(function () {
    'use strict'

    module.exports = {
        signToken: signToken,
        verifyToken: verifyToken,
    }

    const jwt = require('jsonwebtoken')
    const crypto = require('crypto')

    let accessTokenSecret

    function signToken(payload) {
        accessTokenSecret = crypto.randomBytes(256).toString('base64')
        return jwt.sign(payload, accessTokenSecret, { expiresIn: '20m' })
    }

    function verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err, decode) => {
                if (err) return reject(err)
                resolve(decode)
            })
        })
    }
})()
