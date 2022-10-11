import express from 'express';
import { inject, injectable } from 'tsyringe';
import { RateService } from '../service/rate.service';
import { producer } from '../../../rabbitmq/init';

@injectable()
export default class RateController {

    constructor(@inject(RateService) private rateService: RateService) {
    }

    async rate(_request: express.Request, response: express.Response) {
        var message: string;
        try {
            message = 'Rate was successfully sent.';
            response.status(200).json(await this.rateService.rate());
        } catch (error) {
            message = `Couldn't get rate: ${error}`;
            producer.publish(``)
            response.status(400).json({
                message: message
            });
        }
        producer.publish(message);
    }
}