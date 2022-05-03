/** @format */
;(function () {
    'use strict'

    module.exports = {
        addMessage: addMessage,
        getSentMessageByUserId,
        getReceivedMessageByUserId,
        findInAllMessages,
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

    function getSentMessageByUserId(req, res, next) {
        MessageService.fetchSentMessageByUserId(req.params.UserId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }
    function getReceivedMessageByUserId(req, res, next) {
        MessageService.fetchReceivedMessageByUserId(req.params.UserId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }
    function findInAllMessages(req, res, next) {
        MessageService.searchInAllMessages(req.params.UserId, req.params.key)
            .then((messages) => {
                req.response = messages
                next()
            })
            .catch((e) => next(e))
    }
})()
