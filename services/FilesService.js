const fs = require('fs');
const uuid = require('uuid')
const path = require('path')

class FilesService {
    async MakeDir(id) {
        const result = fs.mkdirSync(`./static/${id}`)
        return result
    }
    async DeleteDir(id) {
        const result = fs.rmSync(`static/${id}`, { recursive: true, force: true })
        return result
    }
    async SaveFiles(props) {
        let {files, id, filesArray} = props
        if(!Array.isArray(files)) files = [files]
        if(filesArray) filesArray = JSON.parse(filesArray)

        let fileNames = []
        if(filesArray) fileNames = [...filesArray]
        
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