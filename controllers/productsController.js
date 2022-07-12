const path = require('path')
const fs = require('fs');
const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductsController {
    async create(req, res, next) {
        try {
            let {name, price, specifications, description} = req.body
            const {files} = req.files
            let filesArray = [] 
            if(Array.isArray(files)) {
                filesArray = [...files]
            } else {
                filesArray.push(files)
            }
            const product = await Products.create({name, price, specifications, description})
            fs.mkdirSync(`./static/${product.id}`)
            let fileNames = []
            
            filesArray.forEach(e => {
                e.mv(path.resolve(__dirname, '..', `static/${product.id}`, e.name))
                fileNames.push(e.name)
            })
            
            product.img = JSON.stringify(fileNames)
            await product.save()
            
            return res.json(product)          
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let products = await Products.findAndCountAll();
        return res.json(products)
    }
    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({where:{id}})
        return res.json(product)
    }
    async deleteOne(req, res) {
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