/** @format */
;(function () {
    const mongoose = require('mongoose')

    const capacitySchema = new Schema({
        from: Date,
        to: Date,
        photos: { type: Schema.Types.ObjectId, ref: 'Photos' },
        description: String,
        gender: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        vacant: Boolean,
        created_at: Date,
        updated_at: Date,
    })

    const Capacity = mongoose.model('Capacity', capacitySchema)

    module.exports = { Capacity }
})()
