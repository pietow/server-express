/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        confirmUser: confirmUser,
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
