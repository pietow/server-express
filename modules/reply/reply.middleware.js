/** @format */
;(function () {
    'use strict'

    module.exports = {
        addReply,
        getAllRepliesByMessageId,
    }

    const ReplyService = require('./reply.module.js')().ReplyService

    function addReply(req, res, next) {
        ReplyService.createReply(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }

    function getAllRepliesByMessageId(req, res, next) {
        ReplyService.fetchSentReplyByUserId(req.params.MessageId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((e) => next(e))
    }
})()
