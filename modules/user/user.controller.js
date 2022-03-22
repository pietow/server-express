/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const UserMiddleware = require('./user.module')().UserMiddleware

    router.post('/', UserMiddleware.addUser, (req, res) => {
        res.status(201).json(req.response)
    })

    router.get('/', UserMiddleware.getUsers, (req, res) => {
        res.status(200).json(req.response)
    })

    module.exports = router
})()
