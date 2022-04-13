/** @format */
;(function () {
    'use strict'

    module.exports = {
        addTokenId,
        logout,
    }

    const TokenService = require('./token.module')().TokenService
    const jwtService = require('../../helpers/jwt.util')

    function addTokenId(req, res, next) {
        console.log(req.jwtid)
        TokenService.setToken(req.jwtid, req.body.username).then((isSet) => {
            req.response.setInRedis = isSet
            next()
        })
    }

    function logout(req, res, next) {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        Promise.any(jwtService.verifyTokens(token))
            .then((claim) => {
                TokenService.deleteOneByKey(claim.jwtid)
                    .then((bool) => bool === 1)
                    .then((bool) => {
                        if (bool) {
                            req.response = `token ${claim.jwtid} deleted`
                            next()
                        } else {
                            throw new Error(`token ${claim.jwtid} not found`)
                        }
                    })
                    .catch((err) => next(err))
            })
            .catch((err) => next(err))
    }
})()
