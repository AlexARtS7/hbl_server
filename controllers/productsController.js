const uuid = require('uuid')
const path = require('path')
const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductsController {
    async create(req, res, next) {
        // console.log('img::', req.body)
        try {
            let {name, price, specifications, description} = req.body
            // const {img} = req.files
            // console.log('img::', img)
            // let files = JSON.parse(img)
            // let fileName = uuid.v4() + '.jpg'
            // img.mv(path.resolve(__dirname, '..', 'static', 'fileName.jpg'))
            const product = await Products.create({name, price, specifications, description, img: 'fgf'})
            // let files = JSON.parse(img)
            // console.log('id:: ', res.json(product.id))
            // files.forEach(i => {
            //     img.mv(path.resolve(__dirname, '..', 'static', i))
            // })
            // if(info) {
            //     info = JSON.parse(info)
            //     info.forEach(i => 
            //         DeviceInfo.create({
            //             title: i.title,
            //             description: i.description,
            //             deviceId: device.id
            //         })
            //     )
            // }
            
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