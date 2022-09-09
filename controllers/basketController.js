const {Basket, BasketProducts, Products} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async addProduct(req, res, next) {
        try {
        const {userId, productId} = req.body
        const exist = await Basket.findOne({where: {userId}, include: [{ model: BasketProducts, where: {productId}}]})
        if(exist) {
            return next(ApiError.badRequest('Этот продукт уже добавлен в корзину'))
        }
        const {id: basketId} = await Basket.findOne({where: {userId}, attributes: ['id']})
        const result = await BasketProducts.create({productId, basketId})
        return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getProducts(req, res, next) {
        try {
            const {userId} = req.query
            const result = await Basket.findAll({
                where: {userId}, 
                include: [{model: BasketProducts,
                include: [{ model: Products}]}],                
                })
            return res.json(result[0].basket_products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController