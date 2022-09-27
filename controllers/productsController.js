const InformationService = require('../services/InformationService')
const FilesService = require('../services/FilesService')
const {Products, ProductInfo, Images} = require('../models/models')
const ApiError = require('../error/ApiError')
class ProductsController {
    async createProduct(req, res, next) {
        try {
            let {id, name, price, typeId, info, description} = req.body, product
            if(id){
                product = await Products.update({name, price, typeId, description},{where: {id}})
            } else {
                product = await Products.create({name, price, typeId, description})
            }
            
            if(info) InformationService.setInfo({info, id:product.id || id})
            return res.json(product)          
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getProducts(req, res, next) {
        try {
            let {typeId, limit, page} = req.query
            page = Number(page || 1)
            limit = Number(limit || 9)
            let offset = page * limit - limit
            let products
            if (!typeId) products = {rows:await Products.findAll({limit, offset, include: {all:true}}), count:await Products.count()}
            if (typeId) products = {rows:await Products.findAll({where:{typeId}, limit, offset, include: {all:true}}), count:await Products.count({where:{typeId}})}
            return res.json(products)       
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOneProduct(req, res, next) {
        try {
            const {id} = req.params
            const product = await Products.findOne({where:{id}, include: {all: true}})
            return res.json(product)        
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async destroyProduct(req, res, next) {
        try {
            const {id} = req.query
            await FilesService.DeleteDir(id)
            await Images.destroy({where: {productId:id}})
            await ProductInfo.destroy({where:{productId:id}})
            const product = await Products.destroy({where:{id}})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }        
    }
}

module.exports = new ProductsController()