const fs = require('fs')

class FileWriterService {

	public async write(data: string, path: string): Promise<void> {
		fs.writeFileSync(`data/${path}`, data, 'utf8')
	}
	
}

export default FileWriterService

