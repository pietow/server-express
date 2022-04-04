/** @format */

;(function () {
    'use strict'

    module.exports = {
        getAccommodationByUserId: getAccommodationByUserId,
    }

    const AccommodationService = require('./accommodation.module')()
        .AccommodationService

    function getAccommodationByUserId(req, res, next) {
        AccommodationService.fetchAccommodationByUserId(req.params.userId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }
})()
