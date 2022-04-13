/** @format */
;(function () {
    'use strict'

    module.exports = {
        signJWT: signJWT,
        getTokenId: getTokenId,
        authenticateJWT: authenticateJWT,
        generateAccessToken: generateAccessToken,
        checkHashParam: checkHashParam,
    }

    const jwtService = require('../../helpers/jwt.util')
    const jwt_decode = require('jwt-decode')
    const RedisUtil = require('../redis/redis.module').RedisUtil

    function signJWT(req, res, next) {
        const [accessToken, refreshToken] = jwtService.signTokens()
        req.response.token = accessToken
        req.response.refreshToken = refreshToken
        next()
    }

    function getTokenId(req, res, next) {
        const refreshToken = req.response.refreshToken
        const jwtid = jwt_decode(refreshToken).jwtid

        req.jwtid = jwtid
        next()
    }

    function authenticateJWT(req, res, next) {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]

            Promise.any(jwtService.verifyTokens(token))
                .then((claim) => {
                    next()
                })
                .catch((err) => next(err))
        } else {
            throw Error('No authHeader')
        }
    }

    function generateAccessToken(req, res, next) {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            Promise.any(jwtService.verifyTokens(token))
                .then((claim) => {
                    RedisUtil.redisPromise().then((redisClient) => {
                        redisClient
                            .exists(claim.jwtid)
                            .then((bool) => {
                                return bool === 1
                            })
                            .then((exists) => {
                                if (exists) {
                                    req.response = { exists: exists }
                                    redisClient.del(claim.jwtid)
                                    next()
                                } else {
                                    throw new Error('Token not in DB')
                                }
                            })
                            .catch((err) => next(err))
                    })
                })
                .catch((err) => next(err))
        } else {
            throw Error('No authHeader')
        }
    }

    function checkHashParam(req, res, next) {
        if (req.response.password === req.params.password) return next()
        throw new Error('wrong hash')
    }
})()
