/** @format */

;(function () {
    'use strict'

    module.exports = {
        addProfile: addProfile,
    }

    const ProfileService = require('./profile.module')().ProfileService

    function addProfile(req, res, next) {
        ProfileService.createProfile({ user: req.response?._id })
            .then((data) => {
                if (req.response) {
                    req.response.profile = data
                } else {
                    req.response = data
                }
                next()
            })
            .catch((err) => next(err))
    }
})()
