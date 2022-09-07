const fileReaderService = require('../../services/input_output/fileReaderService')

describe('Testing fileReaderService', () => {
    test('Valid reading', async () => {
        const data = await fileReaderService('check_read.json')
        expect(data).not.toBe(null)
    }),
    test('Invalid reading', async () => {
        let errorFlag = false
        try {
            await fileReaderService('invalid_name.json')
        } catch (error) {
            errorFlag = true
            console.log(error)
        }
        expect(errorFlag).toBe(true)
    })
})

