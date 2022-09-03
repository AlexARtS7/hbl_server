const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkAuth = require('../middleware/checkAuthMiddleware')

router.post('/addproduct', checkAuth(), basketController.addProduct)
// router.post('/addfiles', checkRole('ADMIN'), productsController.addFiles)
router.get('/products', checkAuth(), basketController.getProducts)


module.exports = router