import express from 'express'
import bodyParser from 'body-parser'
import CoinmarketRateController from './controllers/rate.controller'
import EmailController from './controllers/email.controller'
import SubscriptionController from './controllers/subscribe.controller'

class App {

    private app: any = express()
    private port = 8081
    private rateController: CoinmarketRateController;
    private emailController: EmailController;
    private subscriptionController: SubscriptionController;

    constructor() {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.raw())
        this.rateController = new CoinmarketRateController()
        this.emailController = new EmailController()
        this.subscriptionController = new SubscriptionController()
    }

    initRoutes() {
        this.app.get('/rate', (request: express.Request, response: express.Response) => {
            this.rateController.rate(request, response)
        })
        
        this.app.post('/subscribe', (request: express.Request, response: express.Response) => {
            this.subscriptionController.subscribe(request, response)
        })
        
        this.app.post('/sendEmails', (request: express.Request, response: express.Response) => {
            this.emailController.sendEmails(request, response)
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

export default App