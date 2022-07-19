const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductsController {
    async create(req, res, next) {
        try {
            let {name, price, specifications, description, typeId} = req.body
            const {files} = req.files
            let filesArray = [] 
            if(Array.isArray(files)) {
                filesArray = [...files]
            } else {
                filesArray.push(files)
            }
            const product = await Products.create({name, price, specifications, description, typeId})
            fs.mkdirSync(`./static/${product.id}`)
            let fileNames = []
            
            filesArray.forEach(e => {
                const fileName = uuid.v4() + ".jpg"
                e.mv(path.resolve(__dirname, '..', `static/${product.id}`, fileName))
                fileNames.push(fileName)
            })
            
            product.img = JSON.stringify(fileNames)
            await product.save()
            
            return res.json(product)          
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async addFiles(req, res, next) {
        try {
            let {id, filesArray:incommingArray} = req.body
            const {files} = req.files
            const imgArray = JSON.parse(incommingArray)
            let filesArray = [] 
            if(Array.isArray(files)) {
                filesArray = [...files]
            } else {
                filesArray.push(files)
            }
            let fileNames = [...imgArray]
            filesArray.forEach(e => {
                const fileName = uuid.v4() + ".jpg"
                e.mv(path.resolve(__dirname, '..', `static/${id}`, fileName))
                fileNames.push(fileName)
            })
            
            const img = JSON.stringify(fileNames)
            await Products.update({img},{where: {id}})
            
            return res.json(img)          
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteFiles(req, res, next) {
        try {
            let {id, filesArray:incommingArray} = req.body
            const deleteFilesArray = JSON.parse(incommingArray)
            const product = await Products.findOne({where: {id}})
            const imgArray = JSON.parse(product.img)
            const img = JSON.stringify(imgArray.filter(img => !deleteFilesArray.find(item => item.name === img)))
            await Products.update({img},{where: {id}})
            return res.json(incommingArray)          
            
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
            let {id, name, price, specifications, description, typeId} = req.body
            await Products.update({name, price, specifications, description, typeId},{where: {id}})        
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {typeId} = req.query
        let products
        if (!typeId) {
            products = await Products.findAndCountAll()
        }
        if (typeId) {
            products = await Products.findAndCountAll({where:{typeId}})
        }
        return res.json(products)
    }
    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({where:{id}})
        return res.json(product)
    }
    async deleteOne(req, res, next) {
        const {id} = req.params
        try {
            fs.rmSync(`static/${id}`, { recursive: true, force: true });
            const result = await Products.destroy({where:{id}})
            return res.json(result)
        } catch (e) {
            next(ApiError.notImplemented(e.message))
        }
    }
}

module.exports = new ProductsController()