/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const opts = {
        timestamps: true,
    }

    const ProfileSchema = new Schema({
        photo: String,
        onlineStatus: Date,
        title: String,
        text: String,
        motto: String,
        gender: String,
        language: [String],
        city: String,
        destrict: String,
        country: String,
        birthdate: Date,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    }, opts)

    module.exports = mongoose.model('Profile', ProfileSchema)
})()
