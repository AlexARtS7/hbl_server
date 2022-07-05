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
        // let {brandId, typeId, limit, page} = req.query
        // page = page || 1
        // limit = limit || 9
        // let offset = page * limit - limit
        let devices = await Products.findAndCountAll();
        // if(!brandId && !typeId) {
        //     devices = await Device.findAndCountAll({limit, offset})
        // }
        // if(brandId && !typeId) {
        //     devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        // }
        // if(!brandId && typeId) {
        //     devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        // }
        // if(brandId && typeId) {
        //     devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        // }
        return res.json(devices)
    }
    // async getOne(req, res) {
    //     const {id} = req.params
    //     const device = await Device.findOne(
    //         {
    //             where:{id},
    //             include:[{model: DeviceInfo, as: 'info'}]
    //         }
    //     )
    //     return res.json(device)
    // }
}

module.exports = new ProductsController()