// TODO firstly clean the file and then write there, chech if no errors

const fileWriterService = require("../../services/input_output/fileWriterService")

test('Test writing to the file', async () => {
    const data = '\'["{\\"email\\":\\"omeluan.dima@gmail.com\\"}","{\\"email\\":\\"dima.omelyan03@gmail.com\\"}"]\''
    const errorFlag = false
    try {
        await fileWriterService(data, 'check_write.json')
    } catch (e) {
        errorFlag = true
    }
    expect(errorFlag).toBe(false)
})