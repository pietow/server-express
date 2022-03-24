/** @format */

const bcrypt = require('bcrypt')

exports.hashPassword = async (password, saltRounds = 9) => {
    try {
        if (saltRounds > 15) {
            throw new Error('salt number too high')
        }
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
        return error.message
    }
}

exports.comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log(error)
        return error.message
    }
}
