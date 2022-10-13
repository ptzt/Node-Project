const router = require('express').Router()
const ordersController = require('../controllers/orderController')

router
    .route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createOrder)
    .delete(ordersController.deleteProduct)

router
    .route('/:id_order')
    .post(ordersController.addProduct)
    .get(ordersController.getOrderById)
    .put(ordersController.updateProduct)
    .delete(ordersController.deleteOrder)

module.exports = router
