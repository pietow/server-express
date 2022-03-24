/** @format */

const { hashPassword } = require('./password.helper.js')
const { comparePassword } = require('./password.helper.js')
;(async function () {
    const hash = await hashPassword('password')
    const bool = await comparePassword('password', hash)
    console.log(hash)
    console.log(bool)
})()
