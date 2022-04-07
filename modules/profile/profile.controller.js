/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()
    const { upload } = require('../../helpers/upload.helper')

    const Module = require('./profile.module')()
    const ProfileMiddleware = Module.ProfileMiddleware

    /* router.post('/', ProfileMiddleWare.findProfile, (req, res) => { */
    /*     res.status(201).json(req.response) */
    /* }) */

    router.post('/', ProfileMiddleware.addProfile, (req, res) => {
        res.status(201).json(req.response)
    })

    router.get('/:userId', ProfileMiddleware.getProfileByUserId, (req, res) => {
        res.status(200).json(req.response)
    })

    router.put('/:userId', ProfileMiddleware.modifyProfile, (req, res) => {
        res.status(201).json(req.response)
    })

    router.put(
        '/:userId/photo',
        upload.single('file'),
        ProfileMiddleware.addProfilePhoto,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    router.get(
        '/:userId/photo',
        ProfileMiddleware.getProfilePhoto,
        (req, res, next) => {
            next()
        },
    )

    module.exports = router
})()
