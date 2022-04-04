/** @format */
;(function () {
    'use strict'

    module.exports = {
        fetchAccommodationByUserId: fetchAccommodationByUserId,
    }

    const AccommodationModel = require('./accommodation.module')().AccommodationModel

    function fetchAccommodationByUserId(userId) {
        return AccommodationModel.findOne({ user: userId })
            .populate('user')
            .exec()
    }
})()
