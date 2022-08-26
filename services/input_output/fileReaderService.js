const fs = require('fs');

module.exports = async function () {
    // stringify JSON Object

    return fs.readFileSync('data/emails.json', 'utf8', function readFileCallback(error, data) {
        if (error) {
            console.log("An error occured while reading JSON Object from File.");
            return console.log(error);
        }
        return data
    })
}