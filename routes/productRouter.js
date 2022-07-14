const Router = require('express')
const router = new Router()
const productsController = require('../controllers/productsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), productsController.create)
router.post('/addfiles', checkRole('ADMIN'), productsController.addFiles)
router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)
router.delete('/:id', checkRole('ADMIN'), productsController.deleteOne)

module.exports = router