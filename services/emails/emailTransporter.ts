import { google } from 'googleapis'
import Transporter from './transporter.interface';
const nodemailer = require('nodemailer')
require('dotenv').config()

class EmailTransporter implements Transporter {

	private oauth2Client: any;
	private OAuth2: any;


	constructor() {
		this.OAuth2 = google.auth.OAuth2
		this.oauth2Client = new this.OAuth2(
			process.env.OAUTH_CLIENT_ID,
			process.env.OAUTH_CLIENT_SECRET,
			'https://developers.google.com/oauthplayground'
		)
		this.oauth2Client.setCredentials({
			refresh_token: process.env.OAUTH_REFRESH_TOKEN,
		})
	}	

	public async create(): Promise<any> {
		const accessToken = await this.getAccessToken()

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.SENDER_EMAIL,
				accessToken,
				clientId: process.env.OAUTH_CLIENT_ID,
				clientSecret: process.env.OAUTH_CLIENT_SECRET,
				refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			},
		})

		return transporter
	}

	private async getAccessToken(): Promise<any> {
		const accessToken = await new Promise((resolve, reject) => {
			this.oauth2Client.getAccessToken((err: string, token: unknown) => {
				if (err) {
					reject('Failed to create access token :( ' + err)
				}
				resolve(token)
			})
		})
		return accessToken
	}

}

export default EmailTransporter;