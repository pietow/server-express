/** @format */

;(function () {
    'use strict'

    module.exports = {
        addProfile: addProfile,
        getProfileByUserId: getProfileByUserId,
        modifyProfile: modifyProfile,
        addProfilePhoto: addProfilePhoto,
    }

    const mongoose = require('mongoose')
    const Grid = require('gridfs-stream')
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
                req.response.profile = data
                next()
            })
            .catch((err) => {
                next(err)
            })
    }

    function addProfilePhoto(req, res, next) {
        // Init file stream
        const connection = mongoose.connection
        const gfs = Grid(connection.db, mongoose.mongo)
        console.log('MongoDB file stream established')
        gfs.collection('profilePhotos')

        gfs.files.findOne(
            { metadata: { profileId: req.params.userId } },
            (err, file) => {
                if (!file || err) {
                    throw new Error("Couldn't find a photo")
                }
                ProfileService.updateProfileByUserId(req.params.userId, {
                    $set: { photo: file },
                })
                    .then((data) => {
                        req.response.profile = data
                        next()
                    })
                    .catch((err) => {
                        next(err)
                    })
            },
        )
    }
})()
