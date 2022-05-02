/** @format */
;(function () {
    'use strict'

    module.exports = {
        addMessage: addMessage,
        getMessage: getMessage,
    }

    const MessageService = require('./message.module.js')().MessageService

    function addMessage(req, res, next) {
        MessageService.createMessage(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }

    function getMessage(req, res, next) {
        MessageService.fetchMessageById(req.params.messageId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }
})()
