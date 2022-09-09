import express from 'express'

import SubscriptionService from '../services/emails/subscriptionService'
import SendEmailsService from '../services/emails/sendEmailsService'

export const subscribe = async (request: express.Request, response: express.Response) => {
	try {
		let subscriptionService = new SubscriptionService()
		const emails = await subscriptionService.subscribe(request, response)
		return response.status(201).json({data: emails})
	} catch (error) {
		response.status(409).json({
			message: `Couldn't subcribe: ${error}`,
		})
	}
}

export const sendEmails = async (request: express.Request, response: express.Response) => {
	try {
		let sendEmailsService = new SendEmailsService()
		response.status(200).json(await sendEmailsService.sendBulk())
	} catch (error) {
		response.status(400).json({
			message: `Couldn't send emails: ${error}`,
		})
	}
}