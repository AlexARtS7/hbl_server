const Router = require('express')
const router = new Router()
const imagesController = require('../controllers/imagesController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/add', checkRole('ADMIN'), imagesController.addFiles)
router.delete('/delete', checkRole('ADMIN'), imagesController.deleteFiles)
router.post('/setpreview', checkRole('ADMIN'), imagesController.setPreview)

module.exports = router