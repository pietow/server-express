/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        getUsers: getUsers,
        confirmUser: confirmUser,
    }

    const UserService = require('./user.module')().UserService

    function getUsers(req, res, next) {
        UserService.fetchUsers()
            .then((data) => {
                req.response = data
                if (!Array.isArray(data))
                    throw Error(
                        'in UserMiddleware: should return an Array of users',
                    )
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

    function confirmUser(req, res, next) {
        UserService.findUserbyId({
            _id: req.params.userId,
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: 'User Not found.' })
                }
                user.status = 'Active'
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err })
                    }
                })
            })
            .catch((e) => console.log('error', e))
    }
})()
