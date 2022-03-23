/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const UserMiddleware = require('./user.module')().UserMiddleware

    router.post('/', UserMiddleware.addUser, (req, res) => {
        res.status(201).json(req.response)
    })

    router.get('/confirm/:userId', UserMiddleware.confirmUser, (req, res) => {
        res.status(201).json(req.response)
    })

    module.exports = router
})()
