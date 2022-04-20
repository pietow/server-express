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

    const cloudinary = require('cloudinary').v2
    const streamifier = require('streamifier')

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    })

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
                if (!req.response) req.response = {}
                req.response.profile = data
                next()
            })
            .catch((err) => {
                next(err)
            })
    }

    function addProfilePhoto(req, res, next) {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image', overwrite: true },
                    (error, result) => {
                        if (result) {
                            resolve(result)
                        } else {
                            reject(error)
                        }
                    },
                )

                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }
        async function uploadFile(req) {
            const uploadedFile = await streamUpload(req)
            ProfileService.updateProfileByUserId(req.params.userId, {
                photoId: uploadedFile.public_id,
            })
                .then((data) => {
                    req.response = data
                    next()
                })
                .catch((err) => next(err))
        }

        uploadFile(req)
    }

    function getProfilePhoto(req, res, next) {
        ProfileService.fetchProfileByUserId(req.params.userId)
            .then((data) => {
                // get photo by ID and scale to reasonable size
                req.response = cloudinary.image(`${data.photoId}.jpg`, {
                    transformation: [{ width: 400, crop: 'fill' }],
                })
                next()
            })
            .catch((err) => next(err))
    }
})()
