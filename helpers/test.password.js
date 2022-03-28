/** @format */

const PasswordService = require('./password.helper.js')
;(async function () {
    const hash = await PasswordService.hash('password')
    const bool = await PasswordService.compare('password1', hash)
    console.log(hash)
    console.log(bool)
})()
