const {BasketProducts} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    
    async addProduct(req, res, next) {
        try {
        const {userId, productId} = req.body
        const exist = await BasketProducts.findOne({where: {userId, productId}})
        if(exist) {
            return next(ApiError.badRequest('Этот продукт уже добавлен в корзину'))
        }

        const result = await BasketProducts.create({userId, productId})
        } catch (e) {
        next(ApiError.badRequest(e.message))
        }
    }
    async getProducts(req, res) {
        console.log('::::::::');
    }
}

module.exports = new BasketController