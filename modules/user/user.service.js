/** @format */
;(function () {
    'use strict'

    module.exports = {
        createUser: createUser,
        fetchUsers: fetchUsers,
        fetchUserById: fetchUserById,
        fetchUserByUserName: fetchUserByUserName,
    }

    const UserModel = require('./user.module')().UserModel

    function fetchUsers() {
        return UserModel.find({}).exec()
    }

    function createUser(user) {
        return UserModel.create(user)
    }

    function fetchUserById(userId) {
        return UserModel.findById(userId).exec()
    }
    function fetchUserByUserName(username) {
        return UserModel.findOne({ username: username.username }).exec()
    }
})()
