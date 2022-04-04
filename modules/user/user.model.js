/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema
    const ProfileModel = require('../profile/profile.module')().ProfileModel

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
            profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
            active: {
                type: Boolean,
                default: false,
            },
        },
        opts,
    )

    UserSchema.pre('save', function(next) {
        console.log('HELlO WORLD! ')
        ProfileModel.create({user: this._id}).then((docs) => {
            this.profile = docs
            next()
        })
    })
    module.exports = mongoose.model('User', UserSchema)
})()
