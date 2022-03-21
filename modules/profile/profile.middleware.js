/** @format */

;(function () {
    'use strict'

    module.exports = {
        findProfile: findProfile,
    }

    const ProfileModel = require('./profile.model')

    function findProfile(req, res, next) {
        ProfileModel.find({ _id: req.params.profileId })
            .then((data) => {
                req.response = data
                next()
            })
            .catch((error) => {
                next(error)
            })
    }
})()
