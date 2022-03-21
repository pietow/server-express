/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const ProfileSchema = new Schema({
        bio: String,
        img: String,
        username: String,
        gender: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        /* created_at: Date, */
        /* updated_at: Date, */
    })

    module.exports = mongoose.model('Profile', ProfileSchema)
})()
