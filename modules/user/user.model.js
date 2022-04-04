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
            //FOR DEBUGGING
            /* _id: { */
            /*     type: Schema.Types.ObjectId, */
            /*     default: '624ae069a91bf7b8deb12743', */
            /* }, */
            fname: String,
            lname: String,
            username: String,
            email: String,
            password: String,
            profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
            active: {
                type: Boolean,
                default: false,
            },
        },
        opts,
    )

    UserSchema.pre('save', function (next) {
        ProfileModel.create({ user: this._id })
            .then((docs) => {
                this.profile = docs
                next()
            })
            .catch((err) => next(err))
    })

    UserSchema.post('findOneAndRemove', function (doc, next) {
        ProfileModel.findByIdAndRemove(doc.profile)
            .exec()
            .then((docs) => {
                doc.profile = docs
                next()
            })
            .catch((err) => next(err))
    })

    module.exports = mongoose.model('User', UserSchema)
})()
