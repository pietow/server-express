/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const UserMiddleware = require('./user.module')().UserMiddleware

    router.post(
        '/',
        UserMiddleware.addUser,
        UserMiddleware.sendConfirmationMail,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    router.get('/', UserMiddleware.getUsers, (req, res) => {
        res.status(200).json(req.response)
    })

    router.put('/:userId', UserMiddleware.confirmUser, (req, res) => {
        console.log(req.params.userId)
        res.status(201).json(req.response)
    })

    module.exports = router
})()
