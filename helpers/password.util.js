/** @format */
;(function () {
    'use strict'

    module.exports = {
        hash: hash,
        compare: compare,
    }

    const bcrypt = require('bcrypt')

    async function hash(password, saltRounds = 9) {
        try {
            if (saltRounds > 15) {
                throw new Error('salt number too high')
            }
            const salt = await bcrypt.genSalt(saltRounds)
            return await bcrypt.hash(password, salt)
        } catch (error) {
            return error.message
        }
    }

    async function compare(password, hash) {
        try {
            return await bcrypt.compare(password, hash)
        } catch (error) {
            return error.message
        }
    }
})()
