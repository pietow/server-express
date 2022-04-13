/** @format */
;(function () {
    'use strict'

    module.exports = {
        deleteOneByKey: deleteOneByKey,
        setToken: setToken,
    }

    const Redis = require('../redis/redis.module').RedisUtil.redisPromise

    function setToken(key, token) {
        return Redis().then((Redis) => {
            return Redis.set(key, token)
        })
    }

    function deleteOneByKey(key) {
        return Redis().then((Redis) => {
            return Redis.del(key)
        })
    }
})()
