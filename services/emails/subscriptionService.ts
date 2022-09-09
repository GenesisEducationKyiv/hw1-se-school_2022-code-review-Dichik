import FileReaderService from '../input_output/fileReaderService'
import FileWriterService from '../input_output/fileWriterService'
import EmailUtils from '../../helpers/emailUtils'
import express from 'express'

class SubscribtionService {

	private storage: string;
	private emailUtils: EmailUtils;
	private fileReaderService: FileReaderService;
	private fileWriterService: FileWriterService;

	constructor() {
		this.storage = 'emails.json'
		this.emailUtils = new EmailUtils()
		this.fileReaderService = new FileReaderService()
		this.fileWriterService = new FileWriterService()
	}

	public async subscribe(request: express.Request, response: express.Response): Promise<string[]> {

		if (!request.body || !request.body.email) {
			throw Error('Body is required for request.')
		}
	// TODO move all logic with handling emails to helpers and add unit tests to it
		const email = request.body.email

		if (!this.emailUtils.validateEmail(email)) {
			throw Error(
				'You are trying to add invalid email. Please fix it and try again.'
			)
		}

		const dataFromFileJson = await this.fileReaderService.readFromFile(this.storage)
		if (!dataFromFileJson) {
			throw Error("Couldn't load emails from file")
		}

		let allEmails = JSON.parse(dataFromFileJson)
		if (this.emailUtils.checkIfEmailExist(allEmails, email)) {
			throw Error('Email already exists.')
		}

		allEmails.push(email)
		let updatedEmails = JSON.stringify(allEmails)
		await this.fileWriterService.writeToFile(updatedEmails, this.storage)
		
		return allEmails
	}

}

export default SubscribtionService;