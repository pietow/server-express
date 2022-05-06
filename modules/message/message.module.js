/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            MessageController: require('./message.controller'),
            MessageMiddleware: require('./message.middleware'),
            SocketMiddleware: require('./socket.middleware'),
            MessageService: require('./message.service'),
            MessageModel: require('./message.model'),
        }
    }
})()
