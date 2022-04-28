/** @format */
;(function () {
    'use strict'

    module.exports = {
        createUser: createUser,
        fetchUsers: fetchUsers,
        fetchUserById: fetchUserById,
        fetchUserByUserName: fetchUserByUserName,
        updateUser: updateUser,
        deleteUser: deleteUser,
    }

    const UserModel = require('./user.module')().UserModel

    function fetchUsers() {
        return UserModel.find({})
            .populate('profile')
            .populate('accommodation')
            .exec()
    }

    function createUser(user) {
        return UserModel.create(user)
    }

    function fetchUserById(userId) {
        return UserModel.findById(userId)
            .populate('profile')
            .populate('accommodation')
            .exec()
    }

    function fetchUserByUserName(username) {
        return UserModel.findOne({ username: username.username })
            .populate('profile')
            .populate('accommodation')
            .lean()
    }

    function updateUser(userId, user) {
        return UserModel.findByIdAndUpdate(userId, user, {
            runValidators: true,
            new: true,
        }).exec()
    }

    function deleteUser(userId) {
        return UserModel.findByIdAndRemove(userId).exec()
    }
})()
