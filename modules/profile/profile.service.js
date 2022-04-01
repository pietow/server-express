/** @format */
;(function () {
    'use strict'

    module.exports = {
        createProfile: createProfile,
        fetchProfileByUserId: fetchProfileByUserId,
        updateProfileByUserId: updateProfileByUserId,
    }

    const ProfileModel = require('./profile.module')().ProfileModel

    function createProfile(profile) {
        return ProfileModel.create(profile)
    }

    function fetchProfileByUserId(userId) {
        return ProfileModel.findOne({ user: userId }).populate('user').exec()
    }

    function updateProfileByUserId(userId, profile) {
        return ProfileModel.findOneAndUpdate({ user: userId }, profile)
    }
})()
