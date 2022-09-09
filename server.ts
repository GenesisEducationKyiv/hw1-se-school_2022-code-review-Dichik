import express from 'express'
import * as emailController from './controllers/emailController'
import * as rateController from './controllers/rateController'
import bodyParser from 'body-parser'
require('dotenv').config()

const port = 8081

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/rate', (request: express.Request, response: express.Response) => {
	rateController.rate(request, response)
})

app.post('/subscribe', (request: express.Request, response: express.Response) => {
	emailController.subscribe(request, response)
})

app.post('/sendEmails', (request: express.Request, response: express.Response) => {
	emailController.sendEmails(request, response)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
