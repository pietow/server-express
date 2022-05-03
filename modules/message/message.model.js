/** @format */
;(function () {
    const mongoose = require('mongoose')
    const { Schema } = require('mongoose')

    const opts = {
        timestamps: true,
    }

    const MessageSchema = new Schema(
        {
            sender: { type: Schema.Types.ObjectId, ref: 'User' },
            receiver: { type: Schema.Types.ObjectId, ref: 'User' },
            text: { type: String }, // do some Validation
            replies: [
                { type: Schema.Types.ObjectId, ref: 'Reply', required: false },
            ], // allow null
            /* date: { */
            /*     type: Date, */
            /*     // Set Min &max For Date ex... */
            /*     //min: '1987-09-28', */
            /*     //max: '1994-05-23' */
            /* }, */
        },
        opts,
    )
    const MessageModel = mongoose.model('Message', MessageSchema)
    module.exports = MessageModel
})()
