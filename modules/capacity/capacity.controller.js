/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const CapacityMiddleWare = require('./capacity.middleware')

    router.get('/', CapacityMiddleWare.findCapacity, (req, res) => {
        res.status(201).json(req.response)
    })

    module.exports = router
})()
