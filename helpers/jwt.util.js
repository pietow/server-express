/** @format */

;(function () {
    'use strict'

    const accessTokenSecret = process.env.SECRETJWT
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    module.exports = {
        signTokens: signTokens,
        verifyTokens: verifyTokens,
    }

    const jwt = require('jsonwebtoken')
    const crypto = require('crypto')
    const { v4: uuidv4 } = require('uuid')

    function signTokens() {
        return [signAccessToken(), signRefreshToken()]
    }

    function signAccessToken() {
        return jwt.sign({ dummy: 'dummy' }, accessTokenSecret, {
            expiresIn: '15m',
        })
    }

    function signRefreshToken() {
        return jwt.sign({ jwtid: uuidv4() }, refreshTokenSecret, {
            expiresIn: '1d',
        })
    }

    function verifyTokensWrapper(token, secret) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decode) => {
                if (err) return reject(err)
                resolve(decode)
            })
        })
    }

    function verifyTokens(token) {
        return [
            verifyTokensWrapper(token, accessTokenSecret),
            verifyTokensWrapper(token, refreshTokenSecret),
        ]
    }
})()
