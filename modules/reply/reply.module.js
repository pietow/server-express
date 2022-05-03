/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            ReplyController: require('./reply.controller'),
            ReplyMiddleware: require('./reply.middleware'),
            ReplyService: require('./reply.service'),
            ReplyModel: require('./reply.model'),
        }
    }
})()
