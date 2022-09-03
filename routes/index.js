const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/products', productRouter)
router.use('/type', typeRouter)

module.exports = router