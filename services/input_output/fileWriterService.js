const fs = require('fs')

module.exports = async function (data, path) {
	fs.writeFileSync(`data/${path}`, data, 'utf8', function (error) {
		if (error) {
			console.log('An error occured while writing JSON Object to File.')
			return console.log(error)
		}
		console.log('JSON file has been saved.')
	})
}
