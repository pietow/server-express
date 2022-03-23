/** @format */

const nodemailer = require('nodemailer')

module.exports.sendConfirmationEmail = (name, email, userId) => {
    const user = process.env.MAILUSER
    const pass = process.env.MAILPASSWORD
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user,
            pass: pass,
        },
    })
    transport
        .sendMail({
            from: user,
            to: email,
            subject: 'Please confirm your registration at localhost:3000',
            html: `<h1>Email Confirmation for localhost:3000</h1>
                <h2>Hello ${name}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:3000/api/user/confirm/${userId}> Click here</a>
                </div>`,
        })
        .catch((err) => console.log(err))
}
