/** @format */

;(function () {
    'use strict'

    module.exports = {
        addProfile: addProfile,
        getProfileByUserId: getProfileByUserId,
        modifyProfile: modifyProfile,
        addProfilePhoto: addProfilePhoto,
        getProfilePhoto: getProfilePhoto,
    }

    const mongoose = require('mongoose')
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
        const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
            bucketName: 'profilePhotos',
        })
        console.log('MongoDB file stream established')

        gfs.find({ metadata: { userId: req.params.userId } }).toArray(
            (err, files) => {
                // delete previous image(s)
                files.forEach((file, index) => {
                    index < files.length - 1 ? gfs.delete(file._id) : file
                })
                if (!files || err) {
                    throw new Error("Couldn't find a photo")
                }
                ProfileService.updateProfileByUserId(req.params.userId, {
                    $set: { photo: files[0] },
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

    function getProfilePhoto(req, res, next) {
        // Init file stream
        const connection = mongoose.connection
        const gfs = new mongoose.mongo.GridFSBucket(connection.db, {
            bucketName: 'profilePhotos',
        })
        console.log('MongoDB file stream established')

        gfs.find({ metadata: { userId: req.params.userId } }).toArray(
            (err, files) => {
                if (!files || files.length < 1 || err) {
                    return res.status(404).json({
                        err: 'No photo exists',
                    })
                }
                //check if valid image
                if (
                    files[0].contentType === 'image/jpeg' ||
                    files[0].contentType === 'image/png'
                ) {
                    //read output to browser
                    //to display the profile photo in the frontend just use:
                    //<img src="https://_/api/profile/:userId/photo"><img>
                    const downloadStream = gfs.openDownloadStream(files[0]._id)
                    downloadStream.pipe(res)
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    })
                }
                return
            },
        )
    }
})()
