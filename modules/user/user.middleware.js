/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        getUsers: getUsers,
        getUserById: getUserById,
        confirmUser: confirmUser,
        getUserByUserName: getUserByUserName,
        sendConfirmationMail: sendConfirmationMail,
    }

    const UserService = require('./user.module')().UserService
    const MailerHelper = require('../../helpers/mailer.helper')

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

    function getUserById(req, res, next) {
        UserService.fetchUserById(req.params.userId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function getUserByUserName(req, res, next) {
        UserService.fetchUserByUserName(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function sendConfirmationMail(req, res, next) {
        MailerHelper.sendConfirmationMail(
            req.response.fname,
            req.response.lname,
            req.response.email,
            req.response._id,
        )
    }

    function confirmUser(req, res, next) {
        UserService.fetchUserById(req.params.userId)
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
