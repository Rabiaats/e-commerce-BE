"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')

module.exports = async function (to, subject, message) {

    // Set Passive:
    // return true

    //? GoogleMail (gmail):
    // Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const mailSettings = {
        service: 'Gmail',
        user: 'atesr782@gmail.com',
        pass: 'kxjl wxfi huvw hiqb'
    }

    // Connect to mailServer:
    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        }
    })
    // SendMail:
    try {
        const info = await transporter.sendMail({
            from: mailSettings.user,
            to: to,
            subject: subject,
            text: message,
            html: message,
        })

        console.log("Mail gönderildi:", info)
        return info
    } catch (error) {
        console.error("Mail gönderim hatası:", error)
        throw error
    }
}