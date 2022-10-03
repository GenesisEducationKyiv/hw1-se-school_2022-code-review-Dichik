import express from 'express';
import bodyParser from 'body-parser';
import RateController from './controllers/rate.controller';
import { inject, injectable } from 'tsyringe';

@injectable()
export class App {
    private app: any = express();
    private port: number;

    constructor(@inject(RateController) private rateController: RateController) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());

        this.port = process.env.DEFAULT_RATE_SERVICE_PORT as unknown as number;
    }

    initRoutes() {
        this.app.get('/rate', (request: express.Request, response: express.Response) => {
            this.rateController.rate(request, response)
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }

    shutdown() {
        this.app.listen(this.port, () => {
            console.log(`Example app stop listening on port ${this.port}`)
            this.app.close()
        });
    }
}
