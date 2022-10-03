import express from 'express'
import { inject, injectable } from 'tsyringe';
import { RateService } from '../service/rate.service'

@injectable()
export default class RateController {

    constructor(@inject(RateService) private rateService: RateService) {
    }

    async rate(_request: express.Request, response: express.Response) {
        try {
            response.status(200).json(await this.rateService.rate());
        } catch (error) {
            response.status(400).json({
                message: `Couldn't get rate: ${error}`,
            });
        }
    }
}