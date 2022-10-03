import express from 'express'
import { inject, injectable } from 'tsyringe'
import bodyParser from 'body-parser'
import { EmailController } from './controllers/email.controller'
import { SubscriptionController } from './controllers/subscribe.controller'

@injectable()
export class App {
    private app: any = express();
    private port = process.env.DEFAULT_SUBSCRIPTION_SERVICE_PORT as unknown as number;

    constructor(
        @inject(EmailController) private emailController: EmailController,
        @inject(SubscriptionController) private subscriptionController: SubscriptionController
    ) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
    }

    initRoutes() {
        this.app.post(
            '/subscribe',
            (request: express.Request, response: express.Response) => {
                this.subscriptionController.subscribe(request, response)
            }
        );

        this.app.post(
            '/sendEmails',
            (request: express.Request, response: express.Response) => {
                this.emailController.sendEmails(request, response)
            }
        );
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