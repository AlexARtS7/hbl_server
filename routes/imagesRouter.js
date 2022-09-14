const Router = require('express')
const router = new Router()
const imagesController = require('../controllers/imagesController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/addfiles', checkRole('ADMIN'), imagesController.addFiles)
// router.post('/deletefiles', checkRole('ADMIN'), productsController.deleteFiles)
router.post('/setpreview', checkRole('ADMIN'), imagesController.setPreview)

module.exports = router