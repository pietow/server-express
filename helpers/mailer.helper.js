/** @format */

const nodemailer = require('nodemailer')

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
                    return [
                        `Please confirm your account at roam mate`,
                        `<h1>Email Confirmation for roam mate</h1>
                        <h2>Hello ${fname} ${lname}</h2>
                        <p>Thank you for subscribing. Please confirm your email by clicking the following link</p>
                        <a href=http://localhost:${
                            process.env.PORT || 3033
                        }/api/users/${userId}/confirm/> Click here</a>
                        </div>`,
                    ]
                case 'resetPassword':
                    // route to /:userId/:password/reset where there's a form that is sending a PUT request to the same route
                    return [
                        `Reset your password at roam mate`,
                        `<h1>Reset your password for your roam mate account</h1>
                        <h2>Hello ${fname} ${lname}</h2>
                        <p>Have you forgotten your password and do you want to create a new one? Then follow this link:</p>
                        <a href=http://localhost:${
                            process.env.PORT || 3033
                        }/api/users/${userId}/${password}/reset> Click here</a>
                        </div>`,
                    ]
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
        transport.sendMail({
            from: user,
            to: email,
            subject: mailContent()[0],
            html: mailContent()[1],
        })
        return transport
    } catch (err) {
        next(err)
    }
}
