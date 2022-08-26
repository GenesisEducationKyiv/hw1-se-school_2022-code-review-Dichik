const emailController = {}

const subscribeEmail = require('../services/emails/subscriptionService')
const sendEmails = require('../services/emails/sendEmailsService')

emailController.subscribe = async (request, response) => {
    try {
        response.status(200).json(
            await subscribeEmail(request, response)
        )
    } catch (error) {
        response.status(409).json({
            message: `Couldn't subcribe: ${error}`
        })
    }
}

emailController.sendEmails = async (request, response) => {
    try {
        response.status(200).json(
            await sendEmails(request, response)
        )
    } catch (error) {
        response.status(400).json({
            message: `Couldn't send emails: ${error}`
        })
    }
}

module.exports = emailController