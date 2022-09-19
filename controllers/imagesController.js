const {Images} = require('../models/models')
const ApiError = require('../error/ApiError')
const FilesService = require('../services/FilesService')

class ImagesController {
    async addFiles(req, res, next) {
        try {
            let {id} = req.body
            const {files} = req.files 
            const fileNames = await FilesService.SaveFiles({files, id})
            await Images.bulkCreate(fileNames.map(filename => ({img: filename, productId: Number(id)})))

            if(await Images.findOne({where: {preview:true, productId:id}}) === null) {
                const firstImg = await Images.findOne({where: {productId:id}})
                firstImg.preview = true
                await firstImg.save()
            }
            
            return res.json(fileNames)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteFiles(req, res, next) {
        try {
            let {id, imgs} = req.query
            await FilesService.DeleteFiles({id, imgs})
            const result = await Images.destroy({where: {productId:id, img: [...imgs]}})
            return res.json(result)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async setPreview(req, res, next) {
        try {
            const {id, productId} = req.query  
            await Images.update({preview:false}, {where: {preview:true, productId}})  
            const result = await Images.update({preview:true}, {where: {id}})   
            return res.json(result) 
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ImagesController()