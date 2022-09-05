const fileReaderService = require('../../services/input_output/fileReaderService')

test('Valid reading', async () => {
    const data = await fileReaderService('check_read.json')
    expect(data).not.toBe(null)
})