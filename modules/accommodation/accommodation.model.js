/** @format */
;(function () {
    const mongoose = require('mongoose')
    const { Schema } = require('mongoose')

    const AccommodationSchema = new Schema({
        availability: { type: String, default: 'No' },
        guests: { type: Number, default: 0 },
        description: String,
        location: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    })

    module.exports = mongoose.model('Accommodation', AccommodationSchema)
})()
