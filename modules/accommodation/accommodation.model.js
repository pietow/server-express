/** @format */
;(function () {
    const mongoose = require('mongoose')
    const { Schema } = require('mongoose')

    const opts = {
        timestamps: true,
    }

    const AccommodationSchema = new Schema(
        {
            availability: { type: String, default: 'No' },
            guests: { type: Number, default: 0 },
            description: { type: String, maxLength: 300 },
            location: { type: String, maxLength: 100 },
            user: { type: Schema.Types.ObjectId, ref: 'User' },
        },
        opts,
    )
    const AccommodationModel = mongoose.model(
        'Accommodation',
        AccommodationSchema,
    )
    AccommodationModel.schema.path('availability').validate((value) => {
        return /Yes|No|Maybe/i.test(value)
    }, 'Invalid availability')
    module.exports = AccommodationModel
})()
