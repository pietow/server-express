/** @format */

;(function () {
    'use strict'

    module.exports = {
        findCapacity: findCapacity,
    }

    const CapacityModel = require('./capacity.model')

    function findCapacity(req, res, next) {
        CapacityModel.find({ user: req.params.profileId })
            .then((data) => {
                req.response = data
                next()
            })
            .catch((error) => {
                next(error)
            })
    }
})()
