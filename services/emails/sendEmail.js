require('dotenv').config()
const createTransporter = require('./emailTransporter')

module.exports = async (recipient, mailSubject, mailBody) => {
    let mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: recipient,
        subject: mailSubject,
        text: mailBody
    }

    try {
        let emailTransporter = await createTransporter()

        emailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("Email sent: " + info.response)
            }
        })
    } catch (error) {
        console.log(error)
        throw Error('Error while sendeing email.')
    }
}