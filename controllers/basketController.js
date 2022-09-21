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
            let {userId, limit, page} = req.query
            page = Number(page || 1)
            limit = Number(limit || 9)
            let offset = page * limit - limit
            const {id:basketId} = await Basket.findOne({where: {userId}})
            const result = await BasketProducts.findAndCountAll({where:{basketId}, limit, offset, include: {all:true, nested: true}})
            return res.json(result)
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