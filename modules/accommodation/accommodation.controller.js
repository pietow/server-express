/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./accommodation.module')()
    const AccommodationMiddleware = Module.AccommodationMiddleware

    router.get(
        '/:userId',
        AccommodationMiddleware.getAccommodationByUserId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    module.exports = router
})()
