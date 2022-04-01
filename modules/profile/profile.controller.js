/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

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

    module.exports = router
})()
