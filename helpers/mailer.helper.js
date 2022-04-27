/** @format */

const nodemailer = require('nodemailer')
const nextTick = require('sinon/lib/sinon/util/core/next-tick')

module.exports.sendMail = async (
    fname,
    lname,
    email,
    userId,
    mode,
    password = '',
) => {
    try {
        const user = process.env.MAILUSER
        const pass = process.env.MAILPASSWORD
        const mailContent = () => {
            switch (mode) {
                case 'confirmUser':
                    return `<h1>Email Confirmation for Roam Mate</h1>
                        <h2>Hello ${fname} ${lname}</h2>
                        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                        <a href=http://localhost:${
                            process.env.PORT || 3033
                        }/api/users/${userId}/confirm/> Click here</a>
                        </div>`
                case 'resetPassword':
                    // route to /:userId/:password/reset where there's a form that is sending a PUT request to the same route
                    return `<h1>Reset your password for your Roam Mate account</h1>
                        <h2>Hello ${fname} ${lname}</h2>
                        <p>Have you forgotten your password and do you want to create a new one? Then follow this link:</p>
                        <a href=http://localhost:${
                            process.env.PORT || 3033
                        }/api/users/${userId}/${password}/reset> Click here</a>
                        </div>`
                default:
                    break
            }
        }
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass,
            },
        })
        console.log(mailContent())
        transport.sendMail({
            from: user,
            to: email,
            subject: 'Please confirm your account at roam mate',
            html: mailContent(),
        })
        return transport
    } catch (err) {
        next(err)
    }
}
