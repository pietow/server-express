/** @format */
;(function () {
    'use strict'

    module.exports = {
        addTokenId,
        deleteTokenId,
    }

    const TokenService = require('./token.module')().TokenService
    const jwtService = require('../../helpers/jwt.util')

    function addTokenId(req, res, next) {
        TokenService.setToken(req.jwtid, req.body.username).then((isSet) => {
            req.response.setInRedis = isSet
            next()
        })
    }

    function deleteTokenId(req, res, next) {
        TokenService.deleteOneByKey(req.JWT.jwtid)
            .then((bool) => {
                if (bool) {
                    req.response = { success: `token ${req.JWT.jwtid} deleted` }
                    next()
                } else {
                    throw new Error(`token ${req.JWT.jwtid} not found`)
                }
            })
            .catch((err) => next(err))
    }
})()
