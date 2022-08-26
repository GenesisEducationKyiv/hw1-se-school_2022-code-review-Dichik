const writeEmailsToFile = require('../input_output/fileWriterService')
const readEmailsFromFile = require('../input_output/fileReaderService')
const helper = require('../../helpers/emailHelper').default

module.exports = async function (request, response) {

    if (!request.body) {
        throw Error('Body is required for request.')
    }

    emailJson = JSON.stringify(request.body)

    if (!helper.validateEmail(emailJson)) {
        throw Error('You are trying to add invalid email. Please fix it and try again.')
    }

    dataFromFileJson = await readEmailsFromFile()
    if (!dataFromFileJson) {
        throw Error('Couldn\'t load emails from file')
    }

    let allEmails = JSON.parse(dataFromFileJson)            //now it an object
    if (helper.checkIfEmailExist(allEmails, emailJson)) {
        throw Error('Email already exists.')
    }

    allEmails.push(emailJson)                               //add some data
    let updatedEmails = JSON.stringify(allEmails)           //convert it back to json
    await writeEmailsToFile(updatedEmails)

    response.send('Email was successfully added.')
}
