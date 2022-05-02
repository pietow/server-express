/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            MessageController: require('./message.controller'),
            MessageMiddleware: require('./message.middleware'),
            MessageService: require('./message.service'),
            MessageModel: require('./message.model'),
        }
    }
})()
