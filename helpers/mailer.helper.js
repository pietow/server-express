/** @format */

const nodemailer = require('nodemailer')

module.exports.sendConfirmationMail = (fname, lname, email, userId) => {
    const user = process.env.MAILUSER
    const pass = process.env.MAILPASSWORD
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass,
        },
        debug: true, // show debug output
        logger: true, // log information in console
    })
    transport.sendMail(
        {
            from: user,
            to: email,
            subject: 'Please confirm your registration at localhost:3000',
            html: `<h1>Email Confirmation for localhost:3000</h1>
                <h2>Hello ${fname} ${lname}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:${
                    process.env.PORT || 3033
                }/api/users/${userId}/confirm/> Click here</a>
                </div>`,
        },
        (error, info) => {
            if (error) {
                console.log(`Error in sendmail function: ${error}`)
            } else {
                console.log(`Mail sent with the following information: ${info}`)
            }
        },
    )
}
