// TODO firstly clean the file and then write there, chech if no errors

import FileWriterService from "../../services/input_output/fileWriterService"

describe('Test writing to the file', () => {

    const fileWriterService = new FileWriterService()

    test('Test writing to the file', async () => {
        const data = '["omeluan.dima@gmail.com","dima.omelyan03@gmail.com"]'
        let errorFlag: Boolean = false
        try {
            await fileWriterService.write(data, 'check_write.json')
        } catch (e) {
            errorFlag = true
        }
        expect(errorFlag).toBe(false)
    })
    
})