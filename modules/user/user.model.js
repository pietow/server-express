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
            phoneNumber: String,
            address: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
            birthdate: Date,
        },
        opts,
    )
    module.exports = mongoose.model('users', UserSchema)
})()
