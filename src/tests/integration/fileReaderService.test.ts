import FileReaderService from "../../services/input_output/fileReader.service"

describe('Testing fileReaderService', () => {

    const EMPTY_STRING = ''
    let fileReaderService: FileReaderService;

    beforeAll(() => {
        fileReaderService = new FileReaderService()
    })

    test('Valid reading from check_read.json file', async () => {
        let result: string = EMPTY_STRING
        try {
            result = await fileReaderService.read('check_read.json')
        } catch (error) {
            console.log(error)
        }
        expect(result).not.toBe(EMPTY_STRING)
    })

    test('Invalid reading from invalid_name.json file', async () => {
        let result: string = EMPTY_STRING
        try {
            result = await fileReaderService.read('invalid_name.json')
        } catch (error) {
            console.log(error)
        }
        expect(result).toBe(EMPTY_STRING)
    })
    
})

