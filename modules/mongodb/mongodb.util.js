/** @format */
;(function () {
    'use strict'

    module.exports = { init: init }

    const mongoose = require('mongoose')
    require('dotenv').config()

    function init() {
        const options = {
            useNewUrlParser: true,
        }
        const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.9dfvi.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
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
    }
})()
