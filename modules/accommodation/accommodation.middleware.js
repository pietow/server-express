/** @format */

;(function () {
    'use strict'

    module.exports = {
        findAccommodation: findAccommodation,
    }

    const AccommodationModel = require('./accommodation.model')

    function findAccommodation(req, res, next) {
        AccommodationModel.find({ user: req.params.profileId })
            .then((data) => {
                req.response = data
                next()
            })
            .catch((error) => {
                next(error)
            })
    }
})()
