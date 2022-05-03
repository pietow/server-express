/** @format */
;(function () {
    'use strict'
    const express = require('express')
    const router = express.Router()

    const Module = require('./reply.module')()
    const ReplyMiddleware = Module.ReplyMiddleware

    router.post('/', ReplyMiddleware.addReply, (req, res) => {
        res.status(201).json(req.response)
    })
    router.get(
        '/:MessageId/reply',
        ReplyMiddleware.getAllRepliesByMessageId,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )
    module.exports = router
})()
