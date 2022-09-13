const fs = require('fs')

class FileWriterService {

	public async write(data: string, path: string): Promise<string> {
		fs.writeFileSync(`./src/data/${path}`, data, 'utf8')
		return data
	}
	
}

export default FileWriterService

