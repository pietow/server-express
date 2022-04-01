/** @format */

;(function () {
    'use strict'

    module.exports = {
        addProfile: addProfile,
        getProfileByUserId: getProfileByUserId,
        modifyProfile: modifyProfile,
    }

    const ProfileService = require('./profile.module')().ProfileService

    function addProfile(req, res, next) {
        ProfileService.createProfile({ user: req.response?._id })
            .then((data) => {
                if (req.response) {
                    req.response = req.response.toObject()
                    req.response.profile = data
                } else {
                    req.response = data
                }
                next()
            })
            .catch((err) => next(err))
    }

    function getProfileByUserId(req, res, next) {
        ProfileService.fetchProfileByUserId(req.params.userId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function modifyProfile(req, res, next) {
        ProfileService.updateProfileByUserId(req.params.userId, req.body)
            .then((data) => {
                req.response = req.response.toObject()
                req.response.profile = data
                next()
            })
            .catch((err) => {
                next(err)
            })
    }
})()
