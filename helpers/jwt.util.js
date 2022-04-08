/** @format */

;(function () {
    'use strict'

    module.exports = {
        signToken: signToken,
        verifyToken: verifyToken,
    }

    const jwt = require('jsonwebtoken')
    const crypto = require('crypto')

    const accessTokenSecret = process.env.SECRETJWT
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    function signToken(payload) {
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
