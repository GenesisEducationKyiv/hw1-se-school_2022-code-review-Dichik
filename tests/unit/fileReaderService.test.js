const fileReaderService = require('../../services/input_output/fileReaderService')

describe('Test reading from the file', () => {
    const validDataFromFile = '["{\"email\":\"omeluan.dima@gmail.com\"}","{\"email\":\"dima.omelyan03@gmail.com\"}"]'
    const dataPathForTests = '../data/check_read.json'

    test('Valid reading', async () => {
        let data = await fileReaderService(dataPathForTests)
        expect(data).toBe(validDataFromFile)
    })
})