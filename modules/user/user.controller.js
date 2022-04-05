/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const ProfileModule = require('../profile/profile.module')()
    const AccommodationModule =
        require('../accommodation/accommodation.module')()
    const UserMiddleware = Module.UserMiddleware
    const ProfileMiddleware = ProfileModule.ProfileMiddleware
    const AccommodationMiddleware = AccommodationModule.AccommodationMiddleware
    const HashMiddleware = Module.HashMiddleware

    //REGISTRATION
    router.post(
        '/',
        HashMiddleware.getHash,
        UserMiddleware.addUser,
        UserMiddleware.sendConfirmationMail,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LIST OF USERS
    router.get(
        '/',
        HashMiddleware.authenticateJWT,
        UserMiddleware.getUsers,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //ONE USER
    router.get('/:userId', UserMiddleware.getUserById, (req, res) => {
        res.status(200).json(req.response)
    })

    //ONE PROFILE
    router.get(
        '/:userId/profile',
        ProfileMiddleware.getProfileByUserId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //MODIFY USER
    router.put(
        '/:userId',
        HashMiddleware.ignorePassword,
        UserMiddleware.modifyUser,
        ProfileMiddleware.modifyProfile,
        AccommodationMiddleware.modifyAccommodation,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //DELETE USER
    router.delete('/:userId', UserMiddleware.removeUser, (req, res) => {
        res.status(200).json(req.response)
    })

    //LOGIN
    router.post(
        '/login',
        UserMiddleware.getUserByUserName,
        HashMiddleware.compareHash,
        HashMiddleware.signJWT,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //VERIFY USER VIA EMAIL
    router.get(
        '/:userId/confirm',
        UserMiddleware.setActive,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    module.exports = router
})()
