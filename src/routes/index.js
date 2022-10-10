const router = require('express').Router()

const productsRoutes = require('./productsRoutes')
const categoryRoutes = require('./categoryRoutes')
const orderRoutes = require('./ordersRoutes')

router.use('/products', productsRoutes)
router.use('/category', categoryRoutes)
router.use('/orders', orderRoutes)

module.exports = router