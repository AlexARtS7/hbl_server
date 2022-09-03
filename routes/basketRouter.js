const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/addproduct', checkAuth(), basketController.addProduct)
router.get('/products', checkAuth(), basketController.getProducts)
router.get('/products/getone', checkAuth(), basketController.getOne)


module.exports = router