/** @format */
;(function () {
    'use strict'

    module.exports = {
        createProfile: createProfile,
    }

    const ProfileModel = require('./profile.module')().ProfileModel

    function createProfile(profile) {
        return ProfileModel.create(profile)
    }
})()
