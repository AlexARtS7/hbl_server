const {Basket, BasketProducts } = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async addProductToBasket(req, res, next) {
        try {
        const {userId, productId, name} = req.body
        const exist = await Basket.findOne({where: {userId}, include: [{ model: BasketProducts, where: {productId}}]})
        if(exist) {
            return next(ApiError.badRequest('Этот продукт уже добавлен в корзину'))
        }
        const {id: basketId} = await Basket.findOne({where: {userId}, attributes: ['id']})
        const result = await BasketProducts.create({productId, basketId, name})
        return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getBasketProducts(req, res, next) {
        try {
            const {userId} = req.query
            const result = await Basket.findAll({ where: {userId}, include: {all: true, nested: true} })
            return res.json(result[0].basket_products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteProductFromBasket(req, res, next) {
        try {
        const {id} = req.query
            const result = await BasketProducts.destroy({where: {id}})
            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController