/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        getUsers: getUsers,
    }

    const UserService = require('./user.module')().UserService

    function getUsers(req, res, next) {
        UserService.fetchUsers()
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => {
                next(err)
            })
    }

    function addUser(req, res, next) {
        UserService.createUser(req.body).then(success).catch(failure)

        function success(data) {
            req.response = data
            next()
        }

        function failure(err) {
            next(err)
        }
    }
})()
