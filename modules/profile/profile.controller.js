/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const ProfileMiddleWare = require('./profile.middleware')

    router.get('/', ProfileMiddleWare.findProfile, (req, res) => {
        res.status(201).json(req.response)
    })

    module.exports = router
})()
