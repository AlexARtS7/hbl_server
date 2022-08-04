const FilesService = require('../services/FilesService')
const InformationService = require('../services/InformationService')
const {Products, ProductInfo, ProductDescription} = require('../models/models')
const ApiError = require('../error/ApiError')
class ProductsController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info, description} = req.body
            const {files} = req.files
            const product = await Products.create({name, price, typeId})
            await FilesService.MakeDir(product.id)
            const fileNames = await FilesService.SaveFiles({files, id:product.id})
            product.img = JSON.stringify(fileNames)
            await product.save()
            if(info) await InformationService.setInfo({info, id:product.id})
            if(description) await InformationService.setDescription({description, id:product.id})
            return res.json(product)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async addFiles(req, res, next) {
        try {
            let {id, filesArray} = req.body
            const {files} = req.files 
            const fileNames = await FilesService.SaveFiles({files, id, filesArray})
            const img = JSON.stringify(fileNames)
            await Products.update({img},{where: {id}})
            return res.json(img)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteFiles(req, res, next) {
        try {
            let {id, filesArray} = req.body
            filesArray = JSON.parse(filesArray)
            await FilesService.DeleteFiles({id, filesArray})
            const product = await Products.findOne({where: {id}})
            const dbImgArray = JSON.parse(product.img)
            const img = JSON.stringify(dbImgArray.filter(img => !filesArray.find(item => item.name === img)))
            await Products.update({img},{where: {id}})
            return res.json(filesArray)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async orderFiles(req, res, next) {
        try {
            let {id, filesArray:incommingArray} = req.body
            await Products.update({img:incommingArray},{where: {id}})
            return res.json(incommingArray)           
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async updateData(req, res, next) {
        try {
            let {id, name, price, typeId, info, description} = req.body
            const result = await Products.update({name, price, typeId},{where: {id}})    
            if(info) await InformationService.setInfo({info, id})
            if(description) await InformationService.setDescription({description, id})
            return res.json(result)    
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = Number(page || 1)
        limit = Number(limit || 9)
        let offset = page * limit - limit
        let products
        if (!typeId) products = await Products.findAndCountAll({limit, offset})
        if (typeId) products = await Products.findAndCountAll({where:{typeId}, limit, offset})
        return res.json(products)
    }
    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({where:{id}})
        return res.json(product)
    }

    async getInfo(req, res) {
        const {id} = req.params
        const info = await ProductInfo.findAll({where: {productId:id}})
        return res.json(info)
    }

    async getDescription(req, res) {
        const {id} = req.params
        let description = await ProductDescription.findOne({where: {productId:id}})
        if(description === null) description = {description:''}
        return res.json(description)
    }

    async deleteOne(req, res, next) {
        const {id} = req.params
        try {
            FilesService.DeleteDir(id)
            ProductInfo.destroy({where: {productId:id}})
            ProductDescription.destroy({where: {productId:id}})
            const result = await Products.destroy({where:{id}})
            return res.json(result)
        } catch (e) {
            next(ApiError.notImplemented(e.message))
        }
    }
}

module.exports = new ProductsController()