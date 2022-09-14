const Router = require('express')
const router = new Router()
const productsController = require('../controllers/productsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), productsController.createProduct)
router.get('/', productsController.getProducts)
router.get('/:id', productsController.getOneProduct)
router.delete('/delete', checkRole('ADMIN'), productsController.destroyProduct)

module.exports = router