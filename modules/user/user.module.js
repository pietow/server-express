/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            UserController: require('./user.controller'),
            UserMiddleware: require('./user.middleware'),
            HashMiddleware: require('./hash.middleware'),
            UserService: require('./user.service'),
            UserModel: require('./user.model'),
        }
    }
})()
