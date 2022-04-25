/** @format */
;(function () {
    'use strict'

    const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.9dfvi.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

    module.exports = { init: init, connectionString: connectionString }

    const mongoose = require('mongoose')
    require('dotenv').config()

    function init() {
        const options = {
            useNewUrlParser: true,
        }
        mongoose
            .connect(connectionString, options)
            .then((result) => {
                console.log(
                    `MongoDB connection successful. DB: ${process.env.DATABASE}`,
                )
            })
            .catch((err) => {
                console.log(err.message)
                console.log(
                    `MongoDB connection failed to DB: ${process.env.DATABASE}`,
                )
            })
        mongoose.connection.on('connected', () => {
            mongoose.connection.db.collection('users').count((err, count) => {
                if (count === 0) {
                    const UserModel = require('../user/user.module')().UserModel
                    UserModel.init()
                    console.log('User model initialized!')
                }
            })
        })
    }
})()
