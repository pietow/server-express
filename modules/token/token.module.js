/** @format */
;(function () {
    'use strict'

    module.exports = init

    function init() {
        return {
            TokenService: require('./token.service'),
            TokenMiddleware: require('./token.middleware'),
        }
    }
})()
