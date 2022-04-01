/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            ProfileController: require('./profile.controller'),
            ProfileMiddleware: require('./profile.middleware'),
            ProfileService: require('./profile.service'),
            ProfileModel: require('./profile.model'),
        }
    }
})()
