/** @format */
;(function () {
    const mongoose = require('mongoose')
    const { Schema } = require('mongoose')

    const opts = {
        timestamps: true,
    }

    const ReplySchema = new Schema(
        {
            sender: { type: Schema.Types.ObjectId, ref: 'User' },
            message: { type: Schema.Types.ObjectId, ref: 'Message' },
            text: { type: String }, // do some Validation
        },
        opts,
    )
    const ReplyModel = mongoose.model('Reply', ReplySchema)
    module.exports = ReplyModel
})()
