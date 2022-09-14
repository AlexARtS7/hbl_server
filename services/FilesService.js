const fs = require('fs');
const uuid = require('uuid')
const path = require('path')

class FilesService {
    async DeleteDir(id) {
        const result = fs.rmSync(`static/${id}`, { recursive: true, force: true })
        return result
    }
    async SaveFiles(props) {
        let {files, id} = props
        if(!Array.isArray(files)) files = [files]
        let fileNames = []
        const exists = fs.existsSync(path.resolve(__dirname, '..', `static/${id}`))
        if(!exists) fs.mkdirSync(`./static/${id}`)
        files.forEach(e => {
            const fileName = uuid.v4() + ".jpg"
            e.mv(path.resolve(__dirname, '..', `static/${id}`, fileName))
            fileNames.push(fileName)
        })
        return fileNames
    }
    async DeleteFiles(props) {
        let {id, filesArray} = props
        filesArray.forEach(e => {
            fs.unlinkSync(path.resolve(__dirname, '..', `static/${id}`, e.name))
        })
        return filesArray
    }
}

module.exports = new FilesService()