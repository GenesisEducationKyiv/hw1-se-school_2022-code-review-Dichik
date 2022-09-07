const writeEmailsToFile = require('../input_output/fileWriterService')
const readEmailsFromFile = require('../input_output/fileReaderService')
const helper = require('../../helpers/emailHelper')
const storage = 'emails.json'

module.exports = async function (request, response) {
	if (!request.body || !request.body.email) {
		throw Error('Body is required for request.')
	}
// TODO move all logic with handling emails to helpers and add unit tests to it
	const email = request.body.email

	if (!helper.validateEmail(email)) {
		throw Error(
			'You are trying to add invalid email. Please fix it and try again.'
		)
	}

	const dataFromFileJson = await readEmailsFromFile(storage)
	if (!dataFromFileJson) {
		throw Error("Couldn't load emails from file")
	}

	let allEmails = JSON.parse(dataFromFileJson)
	if (helper.checkIfEmailExist(allEmails, email)) {
		throw Error('Email already exists.')
	}

	allEmails.push(email)
	let updatedEmails = JSON.stringify(allEmails)
	await writeEmailsToFile(updatedEmails, storage)
	
	return allEmails
}
