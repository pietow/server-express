/** @format */

;(function () {
    'use strict'

    module.exports = {
        sendSocket,
    }
    const express = require('express')
    const app = express()
    const http = require('http')
    const server = http.createServer(app)
    const { Server } = require('socket.io')
    const io = new Server(server)

    function sendSocket(req, res, next) {}
})()
