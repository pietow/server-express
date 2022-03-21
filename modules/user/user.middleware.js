/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
    }

    const UserService = require('./user.module')().UserService

    function addUser(req, res, next) {
        UserService.createUser(req.body).then(success).catch(failure)

        function success(data) {
            req.response = data
            next()
        }

        function failure(err) {
            next(error)
        }
    }
})()
