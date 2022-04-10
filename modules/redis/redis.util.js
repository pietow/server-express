/** @format */
;(function () {
    'use strict'

    let redisClient

    module.exports = {
        init: init,
        redisPromise: redisPromise,
    }

    const redis = require('ioredis')

    const credentials = {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }

    function init() {
        redisClient = redis.createClient(credentials)
        redisClient.on('connect', () => {
            console.log('connected to redis successfully!')
        })

        redisClient.on('error', (error) => {
            /* redis.disconnect() */
            console.log('Redis connection error :', error)
        })
    }

    function redisPromise() {
        return new Promise((resolve, reject) => {
            if (redisClient) resolve(redisClient)
        })
    }
})()
