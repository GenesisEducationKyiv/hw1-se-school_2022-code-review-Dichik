const rateController = {}

const getBitcoinPrice = require('../services/rating/rateService')

rateController.rate = async (request, response) => {
    try {
        response.status(200).json(
            await getBitcoinPrice(request, response)
        )
    } catch (error) {
        response.status(400).json({
            message: `Couldn't get rate: ${error}`,
        })
    }
}

module.exports = rateController