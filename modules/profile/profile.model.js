/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const opts = {
        timestamps: true,
    }

    const ProfileSchema = new Schema(
        {
            photoId: String,
            onlineStatus: Date,
            title: { type: String, maxLength: 30 },
            text: { type: String, maxLength: 500 },
            motto: { type: String, maxLength: 30 },
            gender: {
                type: String,
                enum: ['Female', 'Male', 'Non-binary', ''],
            },
            language: [String],
            city: { type: String, maxLength: 100 },
            district: { type: String, maxLength: 100 },
            country: { type: String, maxLength: 100 },
            birthdate: Date,
            user: { type: Schema.Types.ObjectId, ref: 'User' },
        },
        opts,
    )

    const ProfileModel = mongoose.model('Profile', ProfileSchema)
    ProfileModel.schema.path('gender').validate((value) => {
        return /Female|Male|Non-binary/i.test(value)
    }, 'Invalid gender')

    module.exports = ProfileModel
})()
