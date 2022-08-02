const Router = require('express')
const router = new Router()
const productsController = require('../controllers/productsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), productsController.create)
router.post('/addfiles', checkRole('ADMIN'), productsController.addFiles)
router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)
router.get('/info/:id', productsController.getInfo)
router.get('/description/:id', productsController.getDescription)
router.delete('/:id', checkRole('ADMIN'), productsController.deleteOne)
router.post('/deletefiles', checkRole('ADMIN'), productsController.deleteFiles)
router.post('/orderfiles', checkRole('ADMIN'), productsController.orderFiles)
router.post('/updatedata', checkRole('ADMIN'), productsController.updateData)

module.exports = router