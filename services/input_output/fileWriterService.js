// file system module to perform file operations
const fs = require('fs');
const readDataFromFile = require('./fileReaderService')


module.exports = async function (data) {
    fs.writeFile('data/emails.json', data, 'utf8', function (error) {
        if (error) {
            console.log("An error occured while writing JSON Object to File.")
            return console.log(error)
        }
        console.log("JSON file has been saved.")
    })
}
