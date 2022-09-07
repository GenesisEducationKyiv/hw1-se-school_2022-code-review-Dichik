const fs = require('fs')

module.exports = function (path) {
	const data = fs.readFileSync(
		`./data/${path}`,
		'utf8',
		function readFileCallback(error, data) {
			if (error) {
				console.log(
					'An error occured while reading JSON Object from File.'
				)
				return console.log(error)
			}
			return data
		}
	)
	return data
}
