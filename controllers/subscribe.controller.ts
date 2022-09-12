import express from 'express'
import SubscribtionService from "../services/emails/subscriptionService"

class SubscriptionController {

    private subscriptionService: SubscribtionService;

    constructor() {
        this.subscriptionService = new SubscribtionService();
    }

    async subscribe(request: express.Request, response: express.Response) {
        try {
            const emails = await this.subscriptionService.subscribe(request, response)
            return response.status(201).json({data: emails})
        } catch (error) {
            response.status(409).json({
                message: `Couldn't subcribe: ${error}`,
            })
        }
    }

}

export default SubscriptionController;