/** @format */

;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            AccommodationController: require('./accommodation.controller'),
            AccommodationMiddleware: require('./accommodation.middleware'),
            AccommodationService: require('./accommodation.service'),
            AccommodationModel: require('./accommodation.model'),
        }
    }
})()
