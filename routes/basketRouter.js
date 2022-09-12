const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/addproduct', checkAuth(), basketController.addProductToBasket)
router.get('/products', checkAuth(), basketController.getBasketProducts)
router.delete('/deleteproduct', checkAuth(), basketController.deleteProductFromBasket)

module.exports = router