/** @format */
;(function () {
    const mongoose = require('mongoose')

    const profileSchema = new Schema({
        bio: String,
        img: String,
        username: String,
        gender: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        created_at: Date,
        updated_at: Date,
    })

    const Profile = mongoose.model('Profile', profileSchema)

    module.exports = { Profile }
})()
