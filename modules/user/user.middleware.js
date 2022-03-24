/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        getUsers: getUsers,
        confirmUser: confirmUser,
    }

    const UserService = require('./user.module')().UserService
    const { hashPassword } = require('../../helpers/password.helper.js')

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
        hashPassword(req.body.password)
            .then((hash) => {
                req.body.password = hash
                UserService.createUser(req.body).then(success).catch(failure)
            })
            .catch((err) => next(err))

        async function success(data) {
            req.response = data
            next()
        }

        function failure(err) {
            next(err)
        }
    }

    function confirmUser(req, res, next) {
        UserService.findUserById(req.params.userId)
            .then((user) => {
                if (!user) {
                    throw Error('User Not found.')
                }
                user.status = 'Active'
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err })
                    }
                })
                req.response = user
                next()
            })
            .catch((e) => next(e))
    }
})()
