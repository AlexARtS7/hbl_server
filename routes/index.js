const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const imagesRouter = require('./imagesRouter')
const basketRouter = require('./basketRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/products', productRouter)
router.use('/images', imagesRouter)
router.use('/type', typeRouter)

module.exports = router