import EmailTransporter from '../transporters/emailTransporter';
import EmailSender from './sender.interface';
import CryptoCurrencyChain from '../../rating/chain/cryptoCurrencyChain';
import SubscriptionRepository from '../../../repositories/subscriptionRepository';
import EmailEntity from '../models/email.entity';
require('dotenv').config()

class SendEmailService implements EmailSender {

    private providerChain: CryptoCurrencyChain;
	private emailsRepository: SubscriptionRepository;
	private emailTrasnporter: any;


	constructor() {
		this.providerChain = new CryptoCurrencyChain();
		this.emailsRepository = new SubscriptionRepository();
		this.emailTrasnporter = new EmailTransporter().create();
	}

	public async send(email: EmailEntity, mailSubject: string, mailBody: string): Promise<void> {
		let mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email.getAddress(),
			subject: mailSubject,
			text: mailBody,
		}
	
		try {
			await this.emailTrasnporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
				if (error) {
					console.log(error)
				} else {
					console.log('Email sent: ' + info.response)
				}
			})
		} catch (error) {
			console.log(error)
			throw new SendEmailError(SendEmailError.SEND_EMAIL_ISSUE)
		}
	}

	public async sendBulk(): Promise<void> {
		let emails: Array<EmailEntity> = await this.emailsRepository.getAll()
		const priceForBTC = await this.providerChain.getCurrencyRate()

		const mailSubject = 'BTC price in UAH'
		const mailBody = `Price for BTC ${priceForBTC} UAH`

		const mailsWithIssues: string[] = []
		for (let i = 0; i < emails.length; ++i) {
			try {
				await this.send(emails[i], mailSubject, mailBody)
			} catch (error) {
				console.log(error)
				mailsWithIssues.push(emails[i].getAddress())
			}
		}
		let message = !mailsWithIssues.length
			? 'Emails were sent'
			: `All mails except ${mailsWithIssues} were sent`
		console.log(message)
	}

}

export default SendEmailService;