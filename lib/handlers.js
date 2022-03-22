/** @format */

const bcrypt = require('bcrypt')

exports.postLogin = (req, res) => {
    console.log(req.body)
    res.json({ result: 'ok' })
}

exports.hashPassword = async (password, saltRounds = 9) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
    }
    // Return null if error
    return null
}

exports.comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log(error)
    }
    // Return null if error
    return null
}
