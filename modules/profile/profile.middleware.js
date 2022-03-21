/** @format */

;(function () {
    'use strict'

    module.exports = {
        findProfile: findProfile,
    }

    const Profile = require('./profile.model')

    function findProfile(req, res, next) {
        return Profile.findOne()
            .populate('user')
            .exec(function (err, profile) {
                if (err) return next(err)
                req.response = profile.populated('user')
                console.log(req.response)
                console.log('The profile is %s', profile)
                next()
                // prints "The author is Ian Fleming"
            })
        /* return Profile.create({ bio: 'Jean-Luc Picard', user: req.body.user }) */
        /*     .then((data) => { */
        /*         req.response = data */
        /*         next() */
        /*     }) */
        /*     .catch((er) => { */
        /*         next(er) */
        /*     }) */
    }
})()
