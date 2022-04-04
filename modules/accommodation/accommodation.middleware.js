/** @format */

;(function () {
    'use strict'

    module.exports = {
        getAccommodationByUserId: getAccommodationByUserId,
        modifyAccommodation: modifyAccommodation,
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

    function modifyAccommodation(req, res, next) {
        AccommodationService.updateAccommodationByUserId(
            req.params.userId,
            req.body,
        )
            .then((data) => {
                req.response.accommodation = data
                next()
            })
            .catch((err) => {
                next(err)
            })
    }
})()
