const readFile = require('../input_output/fileReaderService')
const rateService = require('../rating/rateService')
const sendEmail = require('./sendEmail')

module.exports = async function (request, response) {
    let emailsObject = await readFile()
    let emails = JSON.parse(emailsObject)
    const priceForBTC = await rateService(request, response)
    const mailSubject = "BTC price in UAH"
    const mailBody = `Price for BTC ${priceForBTC} UAH`

    let mailsWithIssues = []
    for (let i = 0; i < emails.length; ++i) {
        let recipient = JSON.parse(emails[i])
        try {
            await sendEmail(recipient.email, mailSubject, mailBody)
        } catch(error) {
            console.log(error)
            mailsWithIssues.push(recipient.email)
        }
    }
    let message = (!mailsWithIssues.length) ? "Emails were sent" : `All mails except ${mailsWithIssues} were sent`
    response.send(message)
}