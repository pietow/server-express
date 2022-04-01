/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const opts = {
        timestamps: true,
    }

    const UserSchema = new Schema(
        {
            fname: String,
            lname: String,
            username: String,
            email: String,
            password: String,
            active: {
                type: Boolean,
                default: false,
            },
        },
        opts,
    )

    module.exports = mongoose.model('User', UserSchema)
})()
