/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema
    const ProfileModel = require('../profile/profile.module')().ProfileModel
    const AccommodationModel =
        require('../accommodation/accommodation.module')().AccommodationModel

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
            accommodation: {
                type: Schema.Types.ObjectId,
                ref: 'Accommodation',
            },
            active: {
                type: Boolean,
                default: false,
            },
        },
        opts,
    )

    UserSchema.pre('save', function (next) {
        const profilePromise = ProfileModel.create({ user: this._id })
        const accommodationPromise = AccommodationModel.create({
            user: this._id,
        })
        Promise.all([profilePromise, accommodationPromise]).then(
            (docChunks) => {
                const [profile, accommodation] = docChunks
                this.profile = profile
                this.accommodation = accommodation
                next()
            },
        )
    })

    UserSchema.post('findOneAndRemove', function (doc, next) {
        const profilePromise = ProfileModel.findByIdAndRemove(
            doc.profile,
        ).exec()
        const accommodationPromise = AccommodationModel.findByIdAndRemove(
            doc.accommodation,
        ).exec()
        Promise.all([profilePromise, accommodationPromise]).then(
            (docChunks) => {
                const [profile, accommodation] = docChunks
                doc.profile = profile
                doc.accommodation = accommodation
                next()
            },
        )
    })

    module.exports = mongoose.model('User', UserSchema)
})()
