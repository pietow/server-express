/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const UserMiddleware = Module.UserMiddleware
    const HashMiddleware = Module.HashMiddleware

    router.post(
        '/',
        HashMiddleware.getHash,
        UserMiddleware.addUser,
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

    router.put(
        '/:userId',
        HashMiddleware.getHash,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.post(
        '/login',
        UserMiddleware.getUserByUserName,
        HashMiddleware.compareHash,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.get('/:userId/confirm', UserMiddleware.confirmUser, (req, res) => {
        res.status(201).json(req.response)
    })

    module.exports = router
})()
