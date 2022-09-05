const Coinmarketcap = require('coinmarketcap-api')
require('dotenv').config()
let key = process.env.COINMARKET_API_KEY
const client = new Coinmarketcap(key)

let crypto = 'BTC'
let convertTo = 'UAH'

module.exports = async function (_request, res, _next) {
	return await client
		.getQuotes({ symbol: crypto, convert: convertTo })
		.then((response) => response.data.BTC.quote.UAH.price)
		.catch((error) => console.log(error))
}
