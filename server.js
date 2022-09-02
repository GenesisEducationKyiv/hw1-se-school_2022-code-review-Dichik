const express = require('express')
const emailController = require('./controllers/emailController')
const rateController = require('./controllers/rateController')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = 8081

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.get('/rate', (request, response) => {
	rateController.rate(request, response)
})

app.post('/subscribe', (request, response) => {
	emailController.subscribe(request, response)
})

app.post('/sendEmails', (request, response) => {
	emailController.sendEmails(request, response)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
