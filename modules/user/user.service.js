/** @format */
;(function () {
    'use strict'

    module.exports = {
        createUser: createUser,
        fetchUsers: fetchUsers,
        findUserById: findUserById,
    }

    const UserModel = require('./user.module')().UserModel

    function fetchUsers() {
        return UserModel.find({}).exec()
    }

    function createUser(user) {
        return UserModel.create(user)
    }

    function findUserById(userId) {
        return UserModel.findById(userId)
    }
})()
