/** @format */
;(function () {
    'use strict'

    module.exports = {
        fetchAccommodationByUserId: fetchAccommodationByUserId,
        updateAccommodationByUserId: updateAccommodationByUserId,
    }

    const AccommodationModel = require('./accommodation.module')()
        .AccommodationModel

    function fetchAccommodationByUserId(userId) {
        return AccommodationModel.findOne({ user: userId })
            .populate('user')
            .exec()
    }

    function updateAccommodationByUserId(userId, accommodation) {
        return AccommodationModel.findOneAndUpdate(
            { user: userId },
            accommodation,
            {
                new: true,
            },
        ).exec()
    }
})()
