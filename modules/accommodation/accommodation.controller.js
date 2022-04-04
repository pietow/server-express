/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const AccommodationMiddleware = require('./accommodation.middleware')

    router.get('/', AccommodationMiddleware.findAccommodation, (req, res) => {
        res.status(201).json(req.response)
    })

    module.exports = router
})()
