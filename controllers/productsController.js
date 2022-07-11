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
            fs.mkdirSync(`./static/${product.id}`);
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
        let devices = await Products.findAndCountAll();
        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({where:{id}})
        return res.json(product)
    }
}

module.exports = new ProductsController()