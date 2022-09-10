import FileReaderService from "../../services/input_output/fileReaderService"

describe('Testing fileReaderService', () => {

    const fileReaderService = new FileReaderService()

    test('Valid reading', async () => {
        const data = await fileReaderService.read('check_read.json')
        expect(data).not.toBe(null)
    })

    test('Invalid reading', async () => {
        let errorFlag = false
        try {
            await fileReaderService.read('invalid_name.json')
        } catch (error) {
            errorFlag = true
            console.log(error)
        }
        expect(errorFlag).toBe(true)
    })
})

