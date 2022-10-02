import express from 'express';
import bodyParser from 'body-parser';
import { RateController } from './controllers/rate.controller';

export class App {
    private app: any = express();
    private port = process.env.DEFAULT_RATE_SERVICE_PORT as unknown as number;
    private rateController: RateController;

    constructor() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.rateController = new RateController();
    }

    initRoutes() {
        this.app.get('/rate', (request: express.Request, response: express.Response) => {
            this.rateController.rate(request, response)
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

    shutdown() {
        this.app.listen(this.port, () => {
            console.log(`Example app stop listening on port ${this.port}`)
            this.app.close()
        })
    }
}
