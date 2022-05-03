/** @format */
;(function () {
    'use strict'
    const express = require('express')
    const router = express.Router()

    const Module = require('./message.module')()
    const MessageMiddleware = Module.MessageMiddleware

    router.post('/', MessageMiddleware.addMessage, (req, res) => {
        res.status(201).json(req.response)
    })
    router.get(
        '/:UserId/sent',
        MessageMiddleware.getSentMessageByUserId,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )
    router.get(
        '/:UserId/receive',
        MessageMiddleware.getReceivedMessageByUserId,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )
    router.get(
        '/:UserId/:key',
        MessageMiddleware.findInAllMessages,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    module.exports = router
})()
