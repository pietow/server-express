/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const UserSchema = new Schema({
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
        age: {
            type: Number,
            default: () => {
                this.created_at - this.birthdate
            },
        },
        created_at: {
            type: Date,
            default: Date.now(),
        },
        updated_at: {
            type: Date,
            default: Date.now(),
        },
    })
    module.exports = mongoose.model('users', UserSchema)
})()
