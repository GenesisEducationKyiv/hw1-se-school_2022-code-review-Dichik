import CoinmarketRateService from '../rating/coinmarketRateService'
import FileReaderService from '../input_output/fileReaderService';
import EmailTransporter from './emailTransporter';
import Sender from './sender.interface';
require('dotenv').config()

class SendEmailService implements Sender {

	private coinmarketRateService: CoinmarketRateService;
	private fileReaderService: FileReaderService;
	private emailTrasnporter: EmailTransporter;


	constructor() {
		this.coinmarketRateService = new CoinmarketRateService();
		this.fileReaderService = new FileReaderService();
		this.emailTrasnporter = new EmailTransporter;
	}

	public async send(recipient: string, mailSubject: string, mailBody: string): Promise<void> {
		let mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: recipient,
			subject: mailSubject,
			text: mailBody,
		}
	
		try {
			let emailTransporter = this.emailTrasnporter.create()
			await emailTransporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
				if (error) {
					console.log(error)
				} else {
					console.log('Email sent: ' + info.response)
				}
			})
		} catch (error) {
			console.log(error)
			throw Error('Error while sendeing email.')
		}
	}

	public async sendBulk(): Promise<void> {
		let emailsObject = await this.fileReaderService.read('emails.json')
		let emails = JSON.parse(emailsObject)
		const priceForBTC = await this.coinmarketRateService.getRate()
		const mailSubject = 'BTC price in UAH'
		const mailBody = `Price for BTC ${priceForBTC} UAH`

		const mailsWithIssues: string[] = []
		for (let i = 0; i < emails.length; ++i) {
			let recipient: string = emails[i]
			try {
				await this.send(recipient, mailSubject, mailBody)
			} catch (error) {
				console.log(error)
				mailsWithIssues.push(recipient)
			}
		}
		let message = !mailsWithIssues.length
			? 'Emails were sent'
			: `All mails except ${mailsWithIssues} were sent`
		// response.send(message)
	}

}

export default SendEmailService;