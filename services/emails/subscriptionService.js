const writeEmailsToFile = require('../input_output/fileWriterService')
const readEmailsFromFile = require('../input_output/fileReaderService')
const helper = require('../../helpers/emailHelper').default
const storage = 'emails.json'

module.exports = async function (request, response) {
	if (!request.body) {
		throw Error('Body is required for request.')
	}
// TODO move all logic with handling emails to helpers and add unit tests to it
	const emailJson = JSON.stringify(request.body)

	if (!helper.validateEmail(emailJson)) {
		throw Error(
			'You are trying to add invalid email. Please fix it and try again.'
		)
	}

	const dataFromFileJson = await readEmailsFromFile(storage)
	if (!dataFromFileJson) {
		throw Error("Couldn't load emails from file")
	}

	let allEmails = JSON.parse(dataFromFileJson)
	let newEmail = JSON.parse(emailJson)
	if (helper.checkIfEmailExist(allEmails, newEmail.email)) {
		throw Error('Email already exists.')
	}

	allEmails.push(emailJson)
	let updatedEmails = JSON.stringify(allEmails)
	await writeEmailsToFile(updatedEmails, storage)

	response.send('Email was successfully added.')
}
