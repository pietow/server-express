/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const ProfileModule = require('../profile/profile.module')()
    const UserMiddleware = Module.UserMiddleware
    const ProfileMiddleware = ProfileModule.ProfileMiddleware
    const HashMiddleware = Module.HashMiddleware

    router.post(
        '/',
        HashMiddleware.getHash,
        UserMiddleware.addUser,
        /* ProfileMiddleware.addProfile, */
        UserMiddleware.sendConfirmationMail,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    router.get('/', UserMiddleware.getUsers, (req, res) => {
        res.status(200).json(req.response)
    })

    router.get('/:userId', UserMiddleware.getUserById, (req, res) => {
        res.status(200).json(req.response)
    })

    router.get(
        '/:userId/profile',
        ProfileMiddleware.getProfileByUserId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.put(
        '/:userId',
        HashMiddleware.getHash,
        UserMiddleware.modifyUser,
        ProfileMiddleware.modifyProfile,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.delete('/:userId', UserMiddleware.removeUser, (req, res) => {
        res.status(200).json(req.response)
    })

    router.post(
        '/login',
        UserMiddleware.getUserByUserName,
        HashMiddleware.compareHash,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

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
